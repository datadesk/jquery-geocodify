(function( $ ){
    $.fn.geocodify = function(options) {
        var opts = options || {},
            width = opts.width || 400,
            height = opts.height ||32,
            fontSize = opts.fontSize || "16px",
            buttonValue = opts.buttonValue || "GO",
            regionBias = opts.regionBias || null,
            viewportBias = opts.viewportBias || null,
            onSelect  = opts.onSelect || function(ele) { alert('Jump to: ' + ele.formatted_address )},
            prepSearchString = opts.prepSearchString || null,
            initialText = opts.initialText || null,
            acceptableAddressTypes = opts.acceptableAddressTypes || [
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
            keyCodes = {
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
            };
        
        var Geocode = function(id, callback, regionBias, viewportBias) {
            this.previousSearch = null;
            this.google = new google.maps.Geocoder();
            this.fetch = function(query, force) {
                if (query === this.previousSearch && !(force)) {
                    return false;
                };
                if (query === initialText) {
                    return false;
                };
                this.previousSearch = query;
                var qLength = query.length;
                if (qLength < 5 && !(force)) {
                    $("#" + id + "-dropdown").html("");
                    $("#" + id + "-dropdown").hide();
                    $("#" + id + "-close").hide();
                    $("#" + id + "-input").css("border", "1px solid #9C9C9C");
                    return false;
                }
                if (prepSearchString) {
                    query = prepSearchString(query);
                }
                var params = { 'address': query };
                if (regionBias) {
                    params['region'] = regionBias;
                };
                if (viewportBias) {
                    params['bounds'] = viewportBias;
                };
                this.google.geocode(params, onGeocode(id, force));
            };
        };
        
        var onGeocode = function(id, force) {
            return function(results, status) {
                // Line up all the object we'll be playing with
                var dropdown = $("#" + id + "-dropdown"),
                    input = $("#" + id + "-input"),
                    close = $("#" + id + "-close");
                
                // Define what will happen when the form is reset
                var reset = function () {
                    dropdown.empty();
                    dropdown.hide();
                    close.hide();
                    input.css({
                        "border": "1px solid #9C9C9C"
                    });
                };
                reset();
                
                // Loop through the results and filter out precision
                // levels we will not accept.
                var keep = new Array();
                $.each(results, function(i, val) {
                    $.each(val.types, function(ii, type) {
                        if (new RegExp(type).test(acceptableAddressTypes.join("|"))) {
                            keep.push(val);
                            return false;
                        }
                    });
                });
                
                var count = keep.length;
                if (count === 0) {
                    var ul = $("<ul>").css({'margin': 0, 'padding': 0, 'background-color': 'white'});
                    var li = $("<li>")
                        .html("No results found. Please refine your search.")
                        .css({
                                'cursor': 'pointer',
                                'margin-left': 0,
                                'padding': '5px 0 5px 8px',
                                'list-style-type': 'none',
                                'text-align': 'left'
                            })
                        .appendTo(ul)
                    ul.appendTo(dropdown);
                    dropdown.show();
                    $("li", dropdown).css("cursor", "default");
                    close.show();
                    close.click(reset)
                } else if (count === 1 && force) {
                    onSelect(results[0]);
                    reset();
                } else {
                    var ul = $("<ul>").css({'margin': 0, 'padding': 0, 'background-color': 'white'});
                    $.each(keep, function(i, val) {
                        $('<li>')
                            .html(val.formatted_address)
                            .css({
                                'cursor': 'pointer',
                                'margin-left': 0,
                                'padding': '5px 0 5px 8px',
                                'list-style-type': 'none',
                                'font-size': fontSize,
                                'text-align': 'left'
                            })
                            .click(function(){onSelect(val); reset();})
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
                    input.css({
                        "border-top": "1px solid #2662CC",
                        "border-right": "1px solid #2662CC",
                        "border-left": "1px solid #2662CC"
                    });
                    dropdown.show();
                    close.show();
                    close.click(reset)
                }
            }
        }
        
        return this.each(function() {
            var $this = $(this);
            
            // Clear out any existing stuff inside the form and set its style
            $this
                .empty()
                .css({ 
                    'position': 'relative',
                    'margin': 0,
                    'padding': 0,
                    'width': width,
                    'z-index': 9001
                });
            document.getElementById($this.attr("id")).setAttribute("autocomplete", "off");
            
            // Add a text input
            var inputId = $this.attr("id") + "-input";
            $('<input>')
                .attr({type: 'text', id: inputId})
                .css({
                    'padding': '2px',
                    'margin': 0,
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'width': width,
                    'height': height - 1,
                    'line-height': fontSize,
                    'font-size': fontSize
                })
                .addClass("geocodifyInput")
                .appendTo($this);
            document.getElementById(inputId).setAttribute("autocomplete", "off");
            var input = $("#" + inputId);
            if (initialText) {
                console.log(initialText);
                input.val(initialText);
                input.focus(function() {
                    if (input.val() == initialText) {
                        input.val("");
                    }
                });
            }
            
            // Add the submit button
            var buttonId = $this.attr("id") + "-button";
            $('<input>')
                .attr({type: 'button', id: buttonId,
                    value: buttonValue})
                .css({
                    'position': 'absolute',
                    'top': 0,
                    'left': width + 10,
                    'padding': '4px',
                    'margin': 0,
                    'font-size': fontSize
                })
                .addClass("geocodifyButton")
                .appendTo($this);
            var button = $("#" + buttonId);
            
            // Add the close box
            var closeId = $this.attr("id") + "-close";
            $("<div>")
                .attr({id: closeId})
                .hide()
                .css({
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'right': "6px",
                    'top': "6px",
                    'height': input.height() + 12,
                    'color': '#2262CC',
                    'font-weight': 'bold'
                })
                .addClass("geocodifyClose")
                .html("X")
                .appendTo($this);

            // Add the dropdown box
            var dropdownId = $this.attr("id") + "-dropdown";
            $("<div>")
                .attr({id: dropdownId})
                .css({
                    'position': 'absolute',
                    'top': input.height() + 6,
                    'left': 0,
                    'border': '1px solid #CCC',
                    'width': width - 2,
                    'z-index': 8001
                })
                .addClass("geocodifyDropdown")
                .hide()
                .appendTo($this);
            var dropdown = $("#" + dropdownId);
            
            // Bind our geocoding operation to the form
            var app = new Geocode($this.attr("id"), onGeocode, regionBias, viewportBias);
            setInterval(function(){app.fetch(input.val(), false)}, 250);
            $this.submit(function(){return false;});
            button.click(function(){app.fetch(input.val(), true);return false;});
            
            // Bind key up and down events
            $this.bind(($.browser.opera ? "keypress" : "keydown"), function(event) {
                switch(event.keyCode) {
                    case keyCodes.UP:
                        var resultList = $("li", dropdown);
                        var selectedIndex = 0;
                        $.each(resultList, function(i, li) {
                            if ( $(li).hasClass("selected") ) {
                                selectedIndex = i;
                                $(li)
                                    .removeClass("selected")
                                    .css({'background-color': 'white'});
                            };
                        });
                        if (selectedIndex -1 < 0) {
                            break;
                        }
                        $(resultList[selectedIndex-1])
                            .addClass("selected")
                            .css({'background-color': '#EEE'});
                        break;
                    case keyCodes.DOWN:
                        var resultList = $("li", dropdown);
                        var selectedIndex = -1;
                        $.each(resultList, function(i, li) {
                            if ( $(li).hasClass("selected") ) {
                                selectedIndex = i;
                                $(li).removeClass("selected")
                                    .css({'background-color': 'white'});
                            };
                        });
                        if (selectedIndex -1 >= resultList.length) {
                            break;
                        }
                        $(resultList[selectedIndex+1])
                            .addClass("selected")
                            .css({'background-color': '#EEE'});
                        break;
                    case keyCodes.RETURN:
                        var resultList = $("li.selected", dropdown);
                        if (resultList) {
                            resultList.click();
                        } else {
                            app.fetch(input.val(), true);
                        }
                        break;
                    default:
                        break;
                };
            });

        });
    };
})( jQuery );


