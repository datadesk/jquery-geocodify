.. raw:: html

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
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

jquery-geocodify
================

Autocomplete for address searches

Features
--------

* Morph an empty form into a search box ready to auto-complete address searches using Google's geocoder
* Handle the user's selected location however you'd like by specifying a simple function
* Bias the results using Google's built-in viewport and region biasing
* Tweak search strings before they're sent and filter geocoder results before they appear

Example
-------

.. raw:: html

    <div style="height:40px;">
        <input id="basic-box"
               placeholder="Enter an address to see geocodify in action."></input>
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
              onSelect: function (result) { updateMap(result); }
          });
        </script>
    </div>
    <div style="height:300px; width:100%; border:1px dotted #ddd; margin-bottom: 25px;" id="map"></div>


Documentation
-------------

.. toctree::
   :maxdepth: 2

   howitworks
   demonstrations
   changelog
   credits

Contributing
------------

* Code repository: `https://github.com/datadesk/jquery-geocodify <https://github.com/datadesk/jquery-geocodify>`_
* Issues: `https://github.com/datadesk/jquery-geocodify/issues <https://github.com/datadesk/jquery-geocodify/issues>`_
