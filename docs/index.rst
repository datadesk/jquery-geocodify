.. raw:: html

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="http://datadesk.github.io/jquery-geocodify/_static/0.2.0/jquery.geocodify.css"/>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="http://datadesk.github.io/jquery-geocodify/_static/0.2.0/jquery.geocodify.min.js"></script>
    <style type="text/css">
        .geocodifyInput {
            border: 1px solid #CCCCCC !important;
            color: #000000 !important;
            font-family: inherit !important;
            font-size: 14px !important;
            height: 14px !important;
            line-height: 20px !important;
            margin: 0 !important;
            outline: medium none !important;
            padding: 9px 5px !important;
            position: relative !important;
            vertical-align: top !important;
            width: 315px !important;
            z-index: 9002 !important;
            box-sizing: content-box;
            -moz-box-sizing: content-box
        }
        .geocodifyDropdown li {
            cursor: pointer !important;
            display: block !important;
            font-family: inherit !important;
            font-size: 100% !important;
            list-style-type: none !important;
            margin: 0 !important;
            padding: 5px 0 5px 8px !important;
            text-align: left !important;
        }
    </style>

jquery-geocodify
================

Autocomplete for address searches

Features
--------

* Morph an empty form into a search box ready to auto-complete address searches using Google's geocoder
* Handle the user's selected location however you'd like by specifying a simple function
* Bias the results using Google's built-in viewport and region biasing
* Tweak search strings before they're sent and filter geocoder results before they appear
* Customize the default text, sizing and other styles

Example
-------

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
    <div style="height:300px; width:100%; border:1px dotted #ddd; margin-bottom: 25px;" id="map"></div>


Documentation
-------------

.. toctree::
   :maxdepth: 2

   howitworks
   demonstrations
   credits

Contributing
------------

* Code repository: `https://github.com/datadesk/python-documentcloud <https://github.com/datadesk/jquery-geocodify>`_
* Issues: `https://github.com/datadesk/python-documentcloud/issues <https://github.com/datadesk/jquery-geocodify/issues>`_
