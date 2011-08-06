==============
Demonstrations
==============

Examples of jquery-geocodify in action. :doc:`Full documentation is elsewhere </index>`.

.. raw:: html

   <hr>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="https://raw.github.com/datadesk/jquery-geocodify/master/jquery.geocodify.js"></script>

The basic box
-------------

.. raw:: html

   <form id="geocodify-basic-box"></form>
   <script type="text/javascript">
        $("#geocodify-basic-box").geocodify({
            onSelect: function (result) { alert(result); }
        });
   </script>

.. code-block:: html

   <form id="geocodify-basic-box"></form>
   <script type="text/javascript">
        $("#geocodify-basic-box").geocodify({
            onSelect: function (result) { alert(result); }
        });
   </script>

Address type whitelisting
-------------------------

The whitelist of acceptable address types can be used to filter the results before they appear in the dropdown. In this example, the form is configured to only return airports. Try searching for "Charles De Gaulle."

.. raw:: html

   <form id="geocodify-address-type-whitelisting"></form>
   <script type="text/javascript">
        $("#geocodify-address-type-whitelisting").geocodify({
            onSelect: function (result) { alert(result); },
            acceptableAddressTypes: [
                'airport'
            ]
        });
   </script>

.. code-block:: html

   <form id="geocodify-address-type-whitelisting"></form>
   <script type="text/javascript">
        $("#geocodify-address-type-whitelisting").geocodify({
            onSelect: function (result) { alert(result); },
            acceptableAddressTypes: [
                'airport'
            ]
        });
   </script>

.. raw:: html

    <hr>

Button values
-------------

You can customize the text that appears in the submit button to be whatever you've like.

.. raw:: html

   <form id="geocodify-button-values-text"></form>
   <script type="text/javascript">
        $("#geocodify-button-values-text").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: "Submit a search, please"
        });
   </script>

.. code-block:: html

   <form id="geocodify-button-values-text"></form>
   <script type="text/javascript">
        $("#geocodify-button-values-text").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: "Submit a search, please"
        });
   </script>
   

You can also remove the button entirely.

.. raw:: html

   <form id="geocodify-button-values-none"></form>
   <script type="text/javascript">
        $("#geocodify-button-values-none").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: false
        });
   </script>

.. code-block:: html

   <form id="geocodify-button-values-none"></form>
   <script type="text/javascript">
        $("#geocodify-button-values-none").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: false
        });
   </script>

.. raw:: html

    <hr>

Filter results
--------------

Geocoder results can be filtered before they appear in the dropdown by passing in a function. It should accept a list of Google geocoder objects and return whatever list you'd like to keep. This example drops any results that aren't filed in Los Angeles County.

.. raw:: html

   <form id="geocodify-filter-results"></form>
   <script type="text/javascript">
        $("#geocodify-filter-results").geocodify({
            onSelect: function (result) { alert(result); },
            filterResults: function(results) {
                var filteredResults =[];
                $.each(results, function(i,val) {
                    for (var ac in val.address_components) {
                        for (var t in val.address_components[ac].types) {
                            if (val.address_components[ac].types[t] === 'administrative_area_level_2') {
                                if (val.address_components[ac].long_name === 'Los Angeles') {
                                    filteredResults.push(val);
                                }
                            }
                        }
                    }
                });
                return filteredResults;
            }
        });
   </script>

.. code-block:: html

   <form id="geocodify-filter-results"></form>
   <script type="text/javascript">
        $("#geocodify-filter-results").geocodify({
            onSelect: function (result) { alert(result); },
            filterResults: function(results) {
                var filteredResults =[];
                $.each(results, function(i,val) {
                    for (var ac in val.address_components) {
                        for (var t in val.address_components[ac].types) {
                            if (val.address_components[ac].types[t] === 'administrative_area_level_2') {
                                if (val.address_components[ac].long_name === 'Los Angeles') {
                                    filteredResults.push(val);
                                }
                            }
                        }
                    }
                });
                return filteredResults;
            }
        });
   </script>

.. raw:: html

    <hr>

Sizing
------

You can customize the size of the text input and submit button with a combination of config options.

.. raw:: html

   <form id="geocodify-font-size"></form>
   <script type="text/javascript">
        $("#geocodify-font-size").geocodify({
            onSelect: function (result) { alert(result); },
            fontSize: "12px",
            height: 20,
            width: 250
        });
   </script>

.. code-block:: html

   <form id="geocodify-font-size"></form>
   <script type="text/javascript">
        $("#geocodify-font-size").geocodify({
            onSelect: function (result) { alert(result); },
            fontSize: "12px",
            height: 20,
            width: 250
        });
   </script>

.. raw:: html

    <hr>
