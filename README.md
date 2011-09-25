jQuery Cover
============

A simple jQuery plugin that ports the CSS3 property `background-size: cover`
to older browsers. As an added benefit, the plugin includes an asynchronous
image loader (since this property is typically used with large background
images).

Usage
-----

    $('#container').cover('background.png');

In this example, the file 'background.png' will loaded and, once the download
is complete, it will be set as the background of the element with id
'container' using the CSS3 property `background-size: cover`; if the browser
does not support the property, a new image element will be inserted into
the container, scaled to cover the element completely, and positioned
horizontally and vertically centered. If you wish to override the positioning
you can do so by passing the appropriate options. For example:

    $('#container').cover({
      src: 'background.png',
      position: 'left top'
    });

This will position the background image at the top left corner instead. If
you would like to display a loading indicator, you can do so, too:

    $('#container').cover({
      src: 'background.png',
      loader: 'loader.gif'
    });

License
-------

Copyright 2011 Sylvester Keil and Johannes Krtek.

jquery.activate.js is distributed under the MIT license. See LICENSE for
details.
