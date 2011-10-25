jQuery Cover
============

A jQuery plugin that ports the CSS3 property `background-size: cover`
to older browsers. As an added benefit, the plugin includes an asynchronous
image loader (since this property is typically used with large background
images) and the possibility to define a list of background images to cycle
through.

Usage
-----

    $('#container').cover('background.png');

In this example, the file 'background.png' will be loaded and, once the download
is complete, it will be set as the background of the element with id
'container' using the CSS3 property `background-size: cover`; if the browser
does not support the property, a new image element will be inserted into
the container, scaled to cover the element completely, and positioned
horizontally and vertically centered.

Additionally, if the CSS3 property is not available, the inserted image's
dimensions will be re-calculated whenever the main window is resized.

If you wish to override the positioning you can do so by passing the
appropriate options. For example:

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

You can also pass in more than one image:

    $('#container').cover(['a.png', 'b.png']);

To cycle through the images call one of:

    $('#container').cover('next');
    $('#container').data('cover').next(); // alternative

    $('#container').cover('play'); // to cycle at set interval
    $('#container').data('cover').play();

You can also start the cycle on start-up by passing in multiple images and
setting the `play` option:

    $('#container').cover({
      src: ['a.png', 'b.png'],
      position: 'left top',
      play: true
    });

The default options are:

    $.fn[cover].defaults = {
      position: 'center center',
      src: null,
      loader: null,
      duration: 500,
      timeout: 5000,
      easing: 'swing',
      play: false
    };



Compatibility
-------------

jquery.cover has been tested on recent versions of Firefox, Opera, Safari,
Chrome, and Internet Explorer 7 and later.


License
-------

Copyright 2011 Sylvester Keil and Johannes Krtek.

jquery.cover.js is distributed under the MIT license. See LICENSE for
details.
