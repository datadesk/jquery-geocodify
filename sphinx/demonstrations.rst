==============
Demonstrations
==============

Examples of jquery-geocodify in action. :doc:`Full documentation is elsewhere </index>`.

.. raw:: html

   <hr>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="https://raw.github.com/datadesk/jquery-geocodify/master/jquery.geocodify.js"></script>

.. _basic-box:
The basic box
-------------

.. raw:: html

   <form id="basic-box"></form>
   <script type="text/javascript">
        $("#basic-box").geocodify({
            onSelect: function (result) { alert(result); }
        });
   </script>

.. code-block:: html

   <form id="basic-box"></form>
   <script type="text/javascript">
        $("#basic-box").geocodify({
            onSelect: function (result) { alert(result); }
        });
   </script>

.. raw:: html

    <hr>

.. _address-type-whitelisting:
Address type whitelisting
-------------------------

The whitelist of acceptable address types can be used to filter the results before they appear in the dropdown. In this example, the form is configured to only return airports. Try searching for "Charles De Gaulle."

.. raw:: html

   <form id="address-type-whitelisting"></form>
   <script type="text/javascript">
        $("#address-type-whitelisting").geocodify({
            onSelect: function (result) { alert(result); },
            acceptableAddressTypes: [
                'airport',
            ]
        });
   </script>

.. code-block:: html

   <form id="address-type-whitelisting"></form>
   <script type="text/javascript">
        $("#address-type-whitelisting").geocodify({
            onSelect: function (result) { alert(result); },
            acceptableAddressTypes: [
                'airport',
            ]
        });
   </script>

.. raw:: html

    <hr>
    
.. _button-values:
Button values
-------------------------

You can customize the text that appears in the submit button to be whatever you've like.

.. raw:: html

   <form id="button-values-text"></form>
   <script type="text/javascript">
        $("#button-values-text").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: "Submit a search please"
        });
   </script>

.. code-block:: html

   <form id="button-values-text"></form>
   <script type="text/javascript">
        $("#button-values-text").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: "Submit a search please"
        });
   </script>
   

You can also remove the button entirely.

.. raw:: html

   <form id="button-values-none"></form>
   <script type="text/javascript">
        $("#button-values-none").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: false
        });
   </script>

.. code-block:: html

   <form id="button-values-none"></form>
   <script type="text/javascript">
        $("#button-values-none").geocodify({
            onSelect: function (result) { alert(result); },
            buttonValue: false
        });
   </script>

.. raw:: html

    <hr>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
