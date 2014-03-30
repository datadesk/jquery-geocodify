How it works
============

Import all the dependencies in your page's head

.. code-block:: html

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/latimes-datadesk-template/css/jquery.geocodify-2.0.css"/>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://s3.amazonaws.com/latimes-datadesk-template/js/jquery.geocodify-0.2-min.js"></script>

Add an empty form to your page's body and initialize it with instructions for what function to run when the user selects an address

.. code-block:: html

    <form id="geocoder"></form>
    <script type="text/javascript">
        $("#geocoder").geocodify({
            onSelect: function (result) { alert(result); } 
        });
    </script>

The example above will just alert the selected address in the browser. It's a JavaScript representation of what is returned by `the Google Maps geocoder. <http://code.google.com/apis/maps/documentation/geocoding/#GeocodingResponses>`_

Options
-------

.. attribute:: onSelect

    A function that takes the Google geocoder's result object and decides what to do with it, like it load it on a map, or redirect to another page, or whatever you need. Required.

.. attribute:: acceptableAddressTypes

    A whitelist of address types allowed to appear in the results. Drawn from `the set defined by Google's geocoder <http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingAddressTypes>`_. Optional. All types accepted by default.

.. attribute:: errorHandler

    A function for handling errors returned by the Google geocoder. Optional. Null by default.

.. attribute:: filterResults

    A function for filtering results before they appear in the dropdown. Optional. Null by default.

.. attribute:: initialText

    Sets a default string to appear when the box loads. Optional. Blank by default.

.. attribute:: minimumCharacters

    Sets the number of characters that must be entered before the geocoder starts to automatically run. Optional. The default is five.

.. attribute:: noResultsText

    The text that appears when a search returns no results. Optional. The default is "No results found. Please refine your search."

.. attribute:: prepSearchString

    A function that treats the search string before it is passed to the geocoder. Optional. Null by default.

.. attribute:: regionBias

    Instruct the geocoder to return results biased towards a particular region of the world. More information about the available codes can be found `here <http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingRegionCodes>`_. Optional. Null by default.

.. attribute:: viewportBias

    Instruct the geocoder to return results biased towards a bounding box presented in Google's data format. Google's documentation can be found `here <http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingViewports>`_. Optional. Null by default.
