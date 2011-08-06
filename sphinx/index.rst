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

    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="https://raw.github.com/datadesk/jquery-geocodify/master/jquery.geocodify.js"></script>
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

    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script> 
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script> 
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

Demonstrations
==============

.. raw:: html
   
   <ul>
      <li><a href="demonstrations.html#basic-box">Basic box</a></li>
      <li><a href="demonstrations.html#address-type-whitelisting">Address type whitelist</a></li>
      <li><a href="demonstrations.html#button-values">Button values</a></li>
      <li><a href="demonstrations.html#filter-results">Filter results</a></li>
      <li><a href="demonstrations.html#sizing">Sizing</a></li>
   </ul>
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
                <th>Demo</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><em>onSelect</em></td>
                <td>
                    A function that takes the Google geocoder's result object and decides what to do with it, like it load it on a map, or redirect to another page, or whatever you need.
                </td>
                <td>An ugly alert with the result's address.</td>
                <td>
                    <a href="demonstrations.html#basic-box">Link</a>
                </td>
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
                <th>Demo</th>
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
                <td>
                    <a href="demonstrations.html#address-type-whitelisting">Link</a>
                </td>
            </tr>
            <tr>
                <td><em>buttonValue</em></td>
                <td>
                    The text that appears in the form's submit button.
                    It can be used to remove the button entirely but submitting false, null or an empty string.
                </td>
                <td>
                    "GO"
                </td>
                <td>
                    <a href="demonstrations.html#button-values">Link</a> 
                </td>
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
                <td><a href="demonstrations.html#filter-results">Link</a></td>
            </tr>
            <tr>
                <td><em>fontSize</em></td>
                <td>Sets the size of the font for the text input and submit button.</td>
                <td>16px</td>
                <td><a href="demonstrations.html#sizing">Link</a></td>
            </tr>
            <tr>
                <td><em>height</em></td>
                <td>Sets the height of input box and submit button. Expects an integer.</td>
                <td>16</td>
                <td><a href="demonstrations.html#sizing">Link</a></td>
            </tr>
            <tr>
                <td><em>width</em></td>
                <td>Sets the width of input box and submit button. Expects an integer.</td>
                <td>16</td>
                <td><a href="demonstrations.html#sizing">Link</a></td>
            </tr>
        </tbody>
    </table>

.. raw:: html
  
   <hr>

Downloads
=========

TK ...

.. raw:: html

   <hr>

Changelog
=========

TK ...

.. raw:: html

   <hr>

Credits
=======

TK ...

.. raw:: html

   <hr>




