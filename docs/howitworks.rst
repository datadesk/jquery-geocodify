How it works
============

Import all the dependencies in your page's head

.. code-block:: html

    <link rel="stylesheet" href="http://datadesk.github.io/jquery-geocodify/_static/0.2.0/jquery.geocodify.css" />
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://datadesk.github.io/jquery-geocodify/_static/0.2.0/jquery.geocodify.min.js"></script>

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
