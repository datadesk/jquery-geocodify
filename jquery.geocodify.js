(function( $ ){
    $.fn.geocodify = function(options) {

        var settings = {
          'width' : 400,
          'height' : 27,
          'fontSize': '16px',
          'buttonValue': 'GO',
          'regionBias': null,
          'viewportBias': null,
          'onSelect': function(ele) { alert('Jump to: ' + ele.formatted_address ); },
          'minimumCharacters': 5,
          'prepSearchString': null,
          'filterResults': null,
          'errorHandler': null,
          'initialText': null,
          'noResultsText': "No results found. Please refine your search.",
          'css': {
                'padding': 0,
                'margin': 0,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'outline-style': 'none',
                'outline-width': 'initial',
                'outline-color': 'initial',
                "border": "1px solid #9C9C9C"
            },
          'acceptableAddressTypes': [
                'street_address',
                'route',
                'intersection',
                'political',
                'country',
                'administrative_area_level_1',
                'administrative_area_level_2',
                'administrative_area_level_3 ',
                'colloquial_area',
                'locality',
                'sublocality',
                'neighborhood',
                'premise',
                'subpremise',
                'postal_code',
                'natural_feature',
                'airport',
                'park',
                'point_of_interest',
                'post_box',
                'street_number',
                'floor',
                'room'
            ],
            'keyCodes' : {
                UP: 38,
                DOWN: 40,
                DEL: 46,
                TAB: 9,
                RETURN: 13,
                ESC: 27,
                COMMA: 188,
                PAGEUP: 33,
                PAGEDOWN: 34,
                BACKSPACE: 8
            }
        };
                
        return this.each(function() {
            var $this = $(this);
            
            if (options) {
                $.extend(settings, options);
            }
            
            // Clear out any existing stuff inside the form and set its style
            $this
                .empty()
                .css({
                    'position': 'relative',
                    'margin': 0,
                    'padding': 0,
                    'width': settings.width,
                    'height': settings.height,
                    'font-size': settings.fontSize,
                    'z-index': 9001
                });
            document.getElementById($this.attr("id")).setAttribute("autocomplete", "off");
            
            // Add a text input
            var inputId = $this.attr("id") + "-input";
            $('<input>')
                .attr({type: 'text', id: inputId})
                .css({
                    'width': settings.width,
                    'height': settings.height,
                    'line-height': settings.fontSize,
                    'font-size': settings.fontSize
                })
                .css(settings.css)
                .addClass("geocodifyInput")
                .appendTo($this);
            document.getElementById(inputId).setAttribute("autocomplete", "off");
            var input = $("#" + inputId);
            
            // Fill in initialText, if it is specified
            if (settings.initialText) {
                input.val(settings.initialText);
                input.css("color", "#9C9C9C");
                input.focus(function() {
                    if (input.val() == settings.initialText) {
                        input.val("");
                        input.css("color", "black");
                    }
                });
            }
            
            if (settings.buttonValue) {
                // Add the submit button
                var buttonId = $this.attr("id") + "-button";
                $('<input>')
                    .attr({type: 'button', id: buttonId,
                           value: settings.buttonValue})
                    .css({
                        'position': 'absolute',
                        'top': 0,
                        'left': settings.width + 10,
                        'padding': '2px',
                        'margin': 0,
                        'font-size': "90%"
                    })
                    .addClass("geocodifyButton")
                    .appendTo($this);
                var button = $("#" + buttonId);
            }
            
            // Add the close box
            var closeId = $this.attr("id") + "-close";
            $("<div>")
                .attr({id: closeId})
                .hide()
                .css({
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'right': "5px",
                    'top': "5px",
                    'height': input.height() + 12,
                    'color': '#2262CC',
                    'font-weight': 'bold',
                    'font-family': 'Arial, sans-serif'
                })
                .addClass("geocodifyClose")
                .html("&#215;")
                .appendTo($this);
            var close = $("#" + closeId);

            // Add the dropdown box
            var dropdownId = $this.attr("id") + "-dropdown";
            $("<div>")
                .attr({id: dropdownId})
                .css({
                    'position': 'absolute',
                    'top': input.height() + 2,
                    'left': 0,
                    'border': '1px solid #CCC',
                    'width': settings.width - 2,
                    'z-index': 8001
                })
                .addClass("geocodifyDropdown")
                .hide()
                .appendTo($this);
            var dropdown = $("#" + dropdownId);
            
            // Define what will happen when the form is reset
            $this.reset = function () {
                dropdown.empty();
                dropdown.hide();
                close.hide();
            };
            
            // Create the bizness for how the geocoder work
            $this.previousSearch = null;
            $this.searchCache = {};
            $this.google = new google.maps.Geocoder();
            $this.fetch = function(query, force) {
                if (query === $this.previousSearch && !(force)) {
                    return false;
                }
                if (query === settings.initialText) {
                    return false;
                }
                $this.previousSearch = query;
                var qLength = query.length;
                if (qLength < settings.minimumCharacters && !(force)) {
                    dropdown.html("");
                    dropdown.hide();
                    close.hide();
                    return false;
                }
                if (settings.prepSearchString) {
                    query = settings.prepSearchString(query);
                }
                var params = { 'address': query };
                if (settings.regionBias) {
                    params['region'] = settings.regionBias;
                }
                if (settings.viewportBias) {
                    params['bounds'] = settings.viewportBias;
                }
                this.google.geocode(params, $this.onGeocode(force));
            };
            
            // The callback that runs after the geocoder returns
            $this.onGeocode = function(force) {
                return function(results, status) {
                    $this.reset();
                    
                    // Handle errors
                    if (status != google.maps.GeocoderStatus.OK) {
                        if (settings.errorHandler) {
                            settings.errorHandler(results, status);
                            return false;
                        }
                    }
                    
                    // Loop through the results and filter out precision
                    // levels we will not accept.
                    var keep = [];
                    $.each(results, function(i, val) {
                        $.each(val.types, function(ii, type) {
                            if (new RegExp(type).test(settings.acceptableAddressTypes.join("|"))) {
                                keep.push(val);
                                return false;
                            }
                        });
                    });
                    
                    // Further filter the results if a function has been provided
                    if (settings.filterResults) {
                        keep = settings.filterResults(keep);
                    }
                    
                    var count = keep.length,
                        ul;

                    if (count === 0) {
                        ul = $("<ul>").css({'margin': 0, 'padding': 0, 'background-color': 'white'});
                        var li = $("<li>")
                            .html(settings.noResultsText)
                            .css({
                                    'cursor': 'pointer',
                                    'margin-left': 0,
                                    'padding': '5px 0 5px 8px',
                                    'list-style-type': 'none',
                                    'text-align': 'left'
                                })
                            .appendTo(ul);
                        ul.appendTo(dropdown);
                        dropdown.show();
                        $("li", dropdown).css("cursor", "default");
                        close.show();
                        close.click($this.reset);
                    } else if (count === 1 && force) {
                        settings.onSelect(keep[0]);
                        $this.reset();
                        $this.previousSearch = results[0].formatted_address;
                        input.val(keep[0].formatted_address);
                    } else {
                        ul = $("<ul>").css({'margin': 0, 'padding': 0, 'background-color': 'white'});
                        $.each(keep, function(i, val) {
                            $('<li>')
                                .html(val.formatted_address)
                                .css({
                                    'cursor': 'pointer',
                                    'margin-left': 0,
                                    'padding': '5px 0 5px 8px',
                                    'list-style-type': 'none',
                                    'font-size': settings.fontSize,
                                    'text-align': 'left'
                                })
                                .click(function(){
                                    settings.onSelect(val);
                                    $this.reset();
                                    $this.previousSearch = val.formatted_address;
                                    input.val(val.formatted_address);
                                })
                                .hover(
                                    function() {
                                        $(this).css({'background-color': '#EEE', 'cursor': 'pointer'});
                                    },
                                    function() {
                                        $(this).css({'background-color': 'white', 'cursor': 'auto'});
                                    })
                                .appendTo(ul);
                        });
                        ul.appendTo(dropdown);
                        dropdown.show();
                        close.show();
                        close.click($this.reset);
                    }
                };
            };
            
            // Bind our geocoding operation to the form
            setInterval(function(){ $this.fetch(input.val(), false); }, 250);
            $this.submit(function(){return false;});
            if (button) {
                button.click(function(){$this.fetch(input.val(), true);return false;});
            }
            
            // Bind key up and down events
            $this.bind("keydown", function(event) {
                var resultList,
                    selectedIndex;

                switch(event.keyCode) {
                    case settings.keyCodes.UP:
                        resultList = $("li", dropdown);
                        selectedIndex = 0;
                        $.each(resultList, function(i, li) {
                            if ( $(li).hasClass("selected") ) {
                                selectedIndex = i;
                                $(li)
                                    .removeClass("selected")
                                    .css({'background-color': 'white'});
                            }
                        });
                        if (selectedIndex -1 < 0) {
                            break;
                        }
                        $(resultList[selectedIndex-1])
                            .addClass("selected")
                            .css({'background-color': '#EEE'});
                        break;
                    case settings.keyCodes.DOWN:
                        resultList = $("li", dropdown);
                        selectedIndex = -1;
                        $.each(resultList, function(i, li) {
                            if ( $(li).hasClass("selected") ) {
                                selectedIndex = i;
                                $(li).removeClass("selected")
                                    .css({'background-color': 'white'});
                            }
                        });
                        if (selectedIndex -1 >= resultList.length) {
                            break;
                        }
                        $(resultList[selectedIndex+1])
                            .addClass("selected")
                            .css({'background-color': '#EEE'});
                        break;
                    case settings.keyCodes.RETURN:
                        resultList = $("li.selected", dropdown);
                        if (resultList) {
                            resultList.click();
                        } else {
                            $this.fetch(input.val(), true);
                        }
                        break;
                    default:
                        break;
                }
            });

        });
    };
})(jQuery);
