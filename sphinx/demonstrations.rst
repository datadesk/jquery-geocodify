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

   <form id="geocoder"></form>
   <script type="text/javascript">
        $("#geocoder").geocodify({
            onSelect: function (ele) { console.log(ele); }
        });
   </script>

.. code-block:: html

   <form id="geocoder"></form>
   <script type="text/javascript">
        $("#geocoder").geocodify({
            onSelect: function (ele) { console.log(ele); }
        });
   </script>
