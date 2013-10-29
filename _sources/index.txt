.. jquery-geocodify documentation master file, created by
   sphinx-quickstart on Fri Aug  5 15:25:18 2011.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. epigraph::

    Autocomplete for address searches

Features
========

* Morph an empty form into a search box ready to auto-complete address searches using Google's geocoder
* Handle the user's selected location however you'd like by specifying a simple function
* Bias the results using Google's built-in viewport and region biasing
* Tweak search strings before they're sent and filter geocoder results before they appear
* Customize the default text, sizing and other styles

.. raw:: html

   <hr>


Example
======= 

.. raw:: html

    <div style="height:40px;">
        <form id="basic-box"></form>
        <script type="text/javascript">
          function updateMap(ele) {
              var lng = ele.geometry.location.lng();
              var lat = ele.geometry.location.lat();
              var myLatlng = new google.maps.LatLng(lat, lng);
              var myOptions = {
                zoom: 10,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("map"), myOptions);
              var marker = new google.maps.Marker({
                  position: myLatlng, 
                  map: map,
                  title: ele.formatted_address
              });
          };
          window.onload = function () {
              var lng = -118.24496984481812;
              var lat = 34.05297942802767;
              var myLatlng = new google.maps.LatLng(lat, lng);
              var myOptions = {
                zoom: 17,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("map"), myOptions);
              var marker = new google.maps.Marker({
                  position: myLatlng, 
                  map: map,
                  title: "Los Angeles Times Globe Lobby"
              });
          }
          $("#basic-box").geocodify({
              onSelect: function (result) { updateMap(result); },
              initialText: "Enter an address to see geocodify in action."
          });
        </script>
    </div>
    <div style="height:300px; width:400px; border:1px solid black;" id="map"></div>

.. raw:: html

   <hr>

Getting Started
===============

Import all the dependencies in your page's head

.. code-block:: html

    <link rel="stylesheet" href="https://raw.github.com/datadesk/jquery-geocodify/master/jquery.geocodify.css" />
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://raw.github.com/datadesk/jquery-geocodify/master/jquery.geocodify.js"></script>

Add an empty form to your page's body and initialize it with instructions for what function to run when the user selects an address

.. code-block:: html

    <form id="geocoder"></form>
    <script type="text/javascript">
        $("#geocoder").geocodify({
            onSelect: function (result) { alert(result); } 
        });
    </script>

The example above will just alert the selected address in the browser. It's a JavaScript representation of what is returned by `the Google Maps geocoder. <http://code.google.com/apis/maps/documentation/geocoding/#GeocodingResponses>`_

.. raw:: html

   <hr>

Configuration
=============

**Required arguments**

.. raw:: html

    <table>
        <thead>
            <tr>
                <th>Option</th>
                <th>Use</th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><em>onSelect</em></td>
                <td>
                    A function that takes the Google geocoder's result object and decides what to do with it, like it load it on a map, or redirect to another page, or whatever you need.
                </td>
                <td>An ugly alert with the result's address.</td>
            </tr>
        </tbody>
    </table>

**Optional arguments**

.. raw:: html
    
    <table>
        <thead>
            <tr>
                <th>Option</th>
                <th>Use</th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><em>acceptableAddressTypes</em></td>
                <td>
                    A whitelist of address types allowed to appear in the results.
                    Drawn from <a href="http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingAddressTypes">the set defined by Google's geocoder</a>.
                </td>
                <td>All types accepted</td>
            </tr>
            <tr>
                <td><em>buttonValue</em></td>
                <td>
                    The text that appears in the form's submit button.
                    It can be used to remove the button entirely but submitting false, null or an empty string.
                </td>
                <td>"GO"</td>
            </tr>
            <tr>
                <td><em>errorHandler</em></td>
                <td>A function for handling errors returned by the Google geocoder.</td>
                <td>null</td>
                <td></td>
            </tr>
            <tr>
                <td><em>filterResults</em></td>
                <td>A function for filtering results before they appear in the dropdown.</td>
                <td>null</td>
            </tr>
            <tr>
                <td><em>initialText</em></td>
                <td>Sets a default string to appear when the box loads.</td>
                <td>null</td>
            </tr>
            <tr>
                <td><em>minimumCharacters</em></td>
                <td>Sets the number of characters that must be entered before the geocoder starts to automatically run.</td>
                <td>5</td>
            <tr>
                <td><em>noResultsText</em></td>
                <td>The text that appears when a search returns no results.</td>
                <td>"No results found. Please refine your search."</td>
            </tr>
            <tr>
                <td><em>prepSearchString</em></td>
                <td>A function that treats the search string before it is passed to the geocoder.</td>
                <td>null</td>
            </tr>
            <tr>
                <td><em>regionBias</em></td>
                <td>Instruct the geocoder to return results biased towards a particular region of the world. More information about the available codes can be found <a href="http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingRegionCodes">here</a>.</td>
                <td>null</td>
            </tr>
            <tr>
                <td><em>viewportBias</em></td>
                <td>Instruct the geocoder to return results biased towards a bounding box presented in Google's data format. Google's documentation can be found <a href="http://code.google.com/apis/maps/documentation/javascript/services.html#GeocodingViewports">here</a>.</td>
                <td>null</td>
            </tr>
        </tbody>
    </table>

.. raw:: html
  
   <hr>

Downloads
=========

.. raw:: html

    <table>
        <thead>
            <tr>
                <th>Version</th>
                <th style="text-align:center;">Unpacked</th>
                <th style="text-align:center;">Minified</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Trunk</td>
                <td style="text-align:center;"><a href="https://raw.github.com/datadesk/jquery-geocodify/master/jquery.geocodify.js">URL</a></td>
                <td style="text-align:center;">&mdash;</td>
            </tr>
            <tr>
                <td>0.2.0</td>
                <td style="text-align:center;"><a href="http://datadesk.github.com/jquery-geocodify/_static/0.2.0/jquery.geocodify.js">URL</a></td>
                <td style="text-align:center;"><a href="http://datadesk.github.com/jquery-geocodify/_static/0.2.0/jquery.geocodify.min.js">URL</a></td>
            </tr>
            <tr>
                <td>0.11</td>
                <td style="text-align:center;"><a href="http://datadesk.github.com/jquery-geocodify/_static/0.11/jquery.geocodify.js">URL</a></td>
                <td style="text-align:center;"><a href="http://datadesk.github.com/jquery-geocodify/_static/0.11/jquery.geocodify.min.js">URL</a></td>
            </tr>
            <tr>
                <td>0.1</td>
                <td style="text-align:center;"><a href="http://datadesk.github.com/jquery-geocodify/_static/0.1/jquery.geocodify.js">URL</a></td>
                <td style="text-align:center;"><a href="http://datadesk.github.com/jquery-geocodify/_static/0.1/jquery.geocodify.min.js">URL</a></td>
            </tr>
        </tbody>
    </table>
    
    <hr>

Demonstrations
==============

Examples of jquery-geocodify in action. :doc:`Full documentation is elsewhere </index>`.

.. raw:: html

   <hr>

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

The whitelist of acceptable address types can be used to filter the results before they appear in the dropdown. In this example, the form is configured to only return airports. Try searching for "LAX" or "Charles De Gaulle."

.. raw:: html

   <form id="geocodify-address-type-whitelisting"></form>
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

   <form id="geocodify-address-type-whitelisting"></form>
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

   <form id="geocodify-filter-results"></form>
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

   <form id="geocodify-filter-results"></form>
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

   <form id="geocodify-initial-text"></form>
   <script type="text/javascript">
        $("#geocodify-initial-text").geocodify({
            onSelect: function (result) { alert(result); },
            initialText: "Enter an address"
        });
   </script>

.. code-block:: html

   <form id="geocodify-initial-text"></form>
   <script type="text/javascript">
        $("#geocodify-initial-text").geocodify({
            onSelect: function (result) { alert(result); },
            initialText: "Enter an address"
        });
   </script>

.. raw:: html

    <hr>

No results text
---------------

You can provide a string for the dropdown when no results return. Try searching some nonsense like "qwerty."

.. raw:: html

   <form id="geocodify-no-results-text"></form>
   <script type="text/javascript">
        $("#geocodify-no-results-text").geocodify({
            onSelect: function (result) { alert(result); },
            noResultsText: "Nein!"
        });
   </script>

.. code-block:: html

   <form id="geocodify-no-results-text"></form>
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

   <form id="geocodify-minimum-characters"></form>
   <script type="text/javascript">
        $("#geocodify-minimum-characters").geocodify({
            onSelect: function (result) { alert(result); },
            minimumCharacters: 2
        });
   </script>

.. code-block:: html

   <form id="geocodify-minimum-characters"></form>
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

A function that treats the search string before it is passed to the geocoder. This example adds "California" to the search if the user has no provided it.

.. raw:: html

   <form id="geocodify-prep-search-string"></form>
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

   <form id="geocodify-prep-search-string"></form>
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

   <form id="geocodify-region-bias"></form>
   <script type="text/javascript">
        $("#geocodify-region-bias").geocodify({
            onSelect: function (result) { alert(result); },
            regionBias: "ES"
        });
   </script>

.. code-block:: html

   <form id="geocodify-region-bias"></form>
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

   <form id="geocodify-viewport-bias"></form>
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

   <form id="geocodify-viewport-bias"></form>
   <script type="text/javascript">
        $("#geocodify-viewport-bias").geocodify({
            onSelect: function (result) { alert(result); },
            viewportBias: new google.maps.LatLngBounds(
                new google.maps.LatLng(33.22030778968541,-118.948974609375),
                new google.maps.LatLng(35.0120020431607,-117.44384765625)
            )
        });
   </script>

Credits
=======

This library was created by `Ben Welsh <https://github.com/palewire/>`_ of the `Los Angeles Times Data Desk <http://datadesk.github.com/>`_. Valuable contributions have been made by `albertsun <https://github.com/albertsun>`_ and `unruthless <https://github.com/unruthless>`_. Inspiration was provided by the `Chicago Tribune News Applications team <https://github.com/newsapps>`_.


