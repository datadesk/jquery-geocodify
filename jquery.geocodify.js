(function( $ ){
    $.fn.geocodify = function(options) {
        var opts = options || {},
            width = opts.width || 400,
            height = opts.height || 35,
            fontSize = opts.fontSize || "16px",
            buttonValue = opts.buttonValue || "GO",
            regionBias = opts.regionBias || null,
            viewportBias = opts.viewportBias || null,
            onSelect  = opts.onSelect || function(ele) {alert('Jump to: ' + ele.formatted_address)};
        
        var Geocode = function(id, callback, regionBias, viewportBias) {
            this.previousSearch = null;
            this.google = new google.maps.Geocoder();
            this.fetch = function(query, force) {
                $.data(document.body, 'forceGeocode', force);
                $.data(document.body, 'geocoderId', id);
                if (query === this.previousSearch && !(force)) {
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
                var params = { 'address': query };
                if (regionBias) {
                    params['region'] = regionBias;
                };
                if (viewportBias) {
                    params['bounds'] = viewportBias;
                };
                this.google.geocode(params, callback);
            };
        };
        
        var callback = function(results, status) {
            var id = $.data(document.body, 'geocoderId'),
                dropdown = $("#" + id + "-dropdown"),
                input = $("#" + id + "-input"),
                close = $("#" + id + "-close");
            dropdown.empty();
            var keep = new Array();
            $.each(results, function(i, val) {
                $.each(val.types, function(j, jal) {
                    if (jal === 'street_address' || jal === 'intersection' || jal === 'postal_code' || jal === 'locality') {
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
                close.click(function() {
                    dropdown.empty();
                    dropdown.hide();
                    close.hide();
                })
            } else if (count === 1 && $.data(document.body, 'forceGeocode')) {
                onSelect(results[0]);
                dropdown.hide();
                close.hide();
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
                            'text-align': 'left'
                        })
                        .click(function(){onSelect(val); dropdown.empty(); dropdown.hide(); close.hide();})
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
                close.click(function() {
                    dropdown.empty();
                    dropdown.hide();
                    close.hide();
                })
            }
        };
        
        return this.each(function() {
            var $this = $(this);
            
            // Clear out any existing stuff inside the form and set its style
            $this
                .empty()
                .css({ 
                    'position': 'relative',
                    'margin': 0,
                    'padding': 0,
                    'height': height,
                    'width': width,
                    'z-index': 9001
                });
            document.getElementById($this.attr("id")).setAttribute("autocomplete", "off");
            
            // Add a text input
            var inputId = $this.attr("id") + "-input";
            $('<input>')
                .attr({type: 'text', id: inputId})
                .css({
                    'padding': '0 0 0 5px',
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'width': width,
                    'font-size': fontSize,
                    'height': height
                })
                .addClass("geocodifyInput")
                .appendTo($this);
            document.getElementById(inputId).setAttribute("autocomplete", "off");
            
            // Add the submit button
            var buttonId = $this.attr("id") + "-button";
            $('<input>')
                .attr({type: 'button', id: buttonId,
                    value: buttonValue})
                .css({
                    'position': 'absolute',
                    'top': 0,
                    'left': width + 10,
                    'height': height - 2,
                    'padding': '1px 6px',
                    'margin': '1px 0',
                    'font-size': fontSize
                })
                .addClass("geocodifyButton")
                .appendTo($this);
            
            // Add the close box
            var closeId = $this.attr("id") + "-close";
            $("<div>")
                .attr({id: closeId})
                .hide()
                .css({
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'left': width * 0.96,
                    'top': height * 0.2,
                    'color': '#2262CC',
                    'font-weight': 'bold',
                    'font-size': fontSize * 0.8
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
                    'top': height,
                    'left': 0,
                    'border': '1px solid #CCC',
                    'width': width - 2,
                    'z-index': 8001
                })
                .addClass("geocodifyDropdown")
                .hide()
                .appendTo($this);
            
            // Bind our geocoding operation to the form
            var app = new Geocode($this.attr("id"), callback, regionBias, viewportBias),
                input = $("#" + inputId),
                button = $("#" + buttonId);
            setInterval(function(){app.fetch(input.val(), false)}, 250);
            $this.submit(function(){app.fetch(input.val(), true);return false;});
            button.click(function(){app.fetch(input.val(), true);return false;});

        });
    };
})( jQuery );


