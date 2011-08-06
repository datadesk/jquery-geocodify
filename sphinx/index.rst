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

* :ref:`Basic box <basic-box>`
* :ref:`Address type whitelist <address-type-whitelisting>`

.. raw:: html

   <hr>

Configuration
=============


**Optional arguments**

.. raw:: html
    
    <table>
        <thead>
            <tr>
                <th>Option</th>
                <th>Use</th>
                <th>Default</th>
                <th>Example</th>
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

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`




