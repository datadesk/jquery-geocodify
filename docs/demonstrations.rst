.. raw:: html

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="http://underscorejs.org/underscore-min.js"></script>
    <style type="text/css">

.. raw:: html
   :file: ../jquery.geocodify.css

.. raw:: html

    </style>
    <script type="text/javascript">

.. raw:: html
   :file: ../jquery.geocodify.js

.. raw:: html

    </script>

Demonstrations
==============

Examples of jquery-geocodify in action. :doc:`Full documentation is elsewhere </index>`.

The basic box
-------------

.. raw:: html

   <input id="geocodify-basic-box"></input>
   <script type="text/javascript">
        $("#geocodify-basic-box").geocodify({
            onSelect: function (result) { alert(result); }
        });
   </script>

.. code-block:: html

   <input id="geocodify-basic-box"></input>
   <script type="text/javascript">
        $("#geocodify-basic-box").geocodify({
            onSelect: function (result) { alert(result); }
        });
   </script>

Address type whitelisting
-------------------------

The whitelist of acceptable address types can be used to filter the results before they appear in the dropdown. In this example, the input is configured to only return airports. Try searching for "LAX" or "Charles De Gaulle."

.. raw:: html

   <input id="geocodify-address-type-whitelisting"></input>
   <script type="text/javascript">
        $("#geocodify-address-type-whitelisting").geocodify({
            onSelect: function (result) { alert(result); },
            acceptableAddressTypes: [
                'airport'
            ],
            minimumCharacters: 3
        });
   </script>

.. code-block:: html

   <input id="geocodify-address-type-whitelisting"></input>
   <script type="text/javascript">
        $("#geocodify-address-type-whitelisting").geocodify({
            onSelect: function (result) { alert(result); },
            acceptableAddressTypes: [
                'airport'
            ],
            minimumCharacters: 3
        });
   </script>

.. raw:: html

    <hr>

Filter results
--------------

Geocoder results can be filtered before they appear in the dropdown by passing in a function. It should accept a list of Google geocoder objects and return whatever list you'd like to keep. This example drops any results that aren't filed in Los Angeles County.

.. raw:: html

   <input id="geocodify-filter-results"></input>
   <script type="text/javascript">
        $("#geocodify-filter-results").geocodify({
            onSelect: function (result) { alert(result); },
            filterResults: function(results) {
                return _.filter(results, function(addy) {
                    return _.some(addy.address_components, function(component) {
                        return component.long_name === 'Los Angeles County';
                    });
                });
            }
        });
   </script>

.. code-block:: html

   <input id="geocodify-filter-results"></input>
   <script type="text/javascript">
        $("#geocodify-filter-results").geocodify({
            onSelect: function (result) { alert(result); },
            filterResults: function(results) {
                // Using some underscore.js tricks here to filter faster
                // http://underscorejs.org/
                return _.filter(results, function(addy) {
                    return _.some(addy.address_components, function(component) {
                        return component.long_name === 'Los Angeles County';
                    });
                });
            }
        });
   </script>

.. raw:: html

    <hr>

Initial text
------------

You can provide a string to load when the box first appears.

.. raw:: html

   <input id="geocodify-initial-text" placeholder="Enter an address"></input>
   <script type="text/javascript">
        $("#geocodify-initial-text").geocodify({
            onSelect: function (result) { alert(result); }
        });
   </script>

.. code-block:: html

   <input id="geocodify-initial-text" placeholder="Enter an address"></input>
   <script type="text/javascript">
        $("#geocodify-initial-text").geocodify({
            onSelect: function (result) { alert(result); },
        });
   </script>

.. raw:: html

    <hr>

No results text
---------------

You can provide a string for the dropdown when no results return. Try searching some nonsense like "qwerty."

.. raw:: html

   <input id="geocodify-no-results-text"></input>
   <script type="text/javascript">
        $("#geocodify-no-results-text").geocodify({
            onSelect: function (result) { alert(result); },
            noResultsText: "Nein!"
        });
   </script>

.. code-block:: html

   <input id="geocodify-no-results-text"></input>
   <script type="text/javascript">
        $("#geocodify-no-results-text").geocodify({
            onSelect: function (result) { alert(result); },
            noResultsText: "Nein!"
        });
   </script>

.. raw:: html

    <hr>

Minimum characters
------------------

Sets the number of characters that must be entered before the geocoder starts to automatically run. This example reduces the number to 2. Try searching "LAX."

.. raw:: html

   <input id="geocodify-minimum-characters"></input>
   <script type="text/javascript">
        $("#geocodify-minimum-characters").geocodify({
            onSelect: function (result) { alert(result); },
            minimumCharacters: 2
        });
   </script>

.. code-block:: html

   <input id="geocodify-minimum-characters"></input>
   <script type="text/javascript">
        $("#geocodify-minimum-characters").geocodify({
            onSelect: function (result) { alert(result); },
            minimumCharacters: 2
        });
   </script>

.. raw:: html

    <hr>

Prep search string
------------------

A function that treats the search string before it is passed to the geocoder. This example adds "California" to the search if the user has not provided it.

.. raw:: html

   <input id="geocodify-prep-search-string"></input>
   <script type="text/javascript">
        $("#geocodify-prep-search-string").geocodify({
            onSelect: function (result) { alert(result); },
            prepSearchString: function(query) { 
                var pattr = /\sca\s|\scalifornia\s/gi;
                var match = query.match(pattr);
                if (!match) {
                    return query + ' California';
                } else {
                    return query;
                }
            }
        });
   </script>

.. code-block:: html

   <input id="geocodify-prep-search-string"></input>
   <script type="text/javascript">
        $("#geocodify-prep-search-string").geocodify({
            onSelect: function (result) { alert(result); },
            prepSearchString: function(query) { 
                var pattr = /\sca\s|\scalifornia\s/gi;
                var match = query.match(pattr);
                if (!match) {
                    return query + ' California';
                } else {
                    return query;
                }
            }
        });
   </script>

.. raw:: html

    <hr>

Region bias
-----------

Instruct the geocoder to return results biased towards a particular region of the world. More information about the available codes can be found `here <http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingRegionCodes>`_. This example biases results to Spain.

.. raw:: html

   <input id="geocodify-region-bias"></input>
   <script type="text/javascript">
        $("#geocodify-region-bias").geocodify({
            onSelect: function (result) { alert(result); },
            regionBias: "ES"
        });
   </script>

.. code-block:: html

   <input id="geocodify-region-bias"></input>
   <script type="text/javascript">
        $("#geocodify-region-bias").geocodify({
            onSelect: function (result) { alert(result); },
            regionBias: "ES"
        });
   </script>

.. raw:: html

    <hr>

Viewport bias
-------------

Instruct the geocoder to return results biased towards a bounding box presented in Google's data format. Google's documentation can be found `here <http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingViewports>`_. This example biases results to a box surrounding Los Angeles County.

.. raw:: html

   <input id="geocodify-viewport-bias"></input>
   <script type="text/javascript">
        $("#geocodify-viewport-bias").geocodify({
            onSelect: function (result) { alert(result); },
            viewportBias: new google.maps.LatLngBounds(
                new google.maps.LatLng(33.22030778968541,-118.948974609375),
                new google.maps.LatLng(35.0120020431607,-117.44384765625)
            )
        });
   </script>

.. code-block:: html

   <input id="geocodify-viewport-bias"></input>
   <script type="text/javascript">
        $("#geocodify-viewport-bias").geocodify({
            onSelect: function (result) { alert(result); },
            viewportBias: new google.maps.LatLngBounds(
                new google.maps.LatLng(33.22030778968541,-118.948974609375),
                new google.maps.LatLng(35.0120020431607,-117.44384765625)
            )
        });
   </script>
