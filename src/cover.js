;(function ($, window, document, cover, version, undefined) {
	var my = {};
	
	my.resize = function (image, w, h, position) {
		if (image.width / image.height < w / h) {
			image.style.cssText = 'width:100%;top:' +
				((/center/).test(position.split(/\s+/)[1]) ? -0.5 * image.height : 0) + 'px';
		}
		else {
			image.style.cssText = 'height:100%;left:' +
				((/center/).test(position.split(/\s+/)[0]) ? -0.5 * image.width : 0) + 'px';
		}
	};
		
	$.fn[cover] = function (args) {
		var elements = this, options, image;
		
		if (elements.length) {
			
			if (typeof args === 'string') {
				options = $.extend({}, $.fn.cover.defaults, { src: args });
			}
			else {
				options = $.extend({}, $.fn[cover].defaults, args);
			}

			if (options.loader) {
				elements.css({
					'background-image': ['url(', options.loader, ')'].join(''),
					'background-position': 'center center',
					'background-repeat': 'no-repeat'
				});
			}
			
			image = new Image();
			image.onload = function () {
				if ($.fn[cover].supported) {
					elements.each(function () {
						$(this).css({
							'background-image': ['url(', options.src, ')'].join(''),
							'background-position': options.position,
							'background-size': 'cover'
						});
					});
				}
				else {
					elements.each(function () {
						var e = $(this);

						my.resize(image, e.width(), e.height(), options.position);
						e.css({ overflow: 'hidden' }).prepend(image);
						
						$(window).bind('resize.cover', function () {
							my.resize(image, e.width(), e.height());
						});
					});
				}
			};
			image.src = options.src;
			
		}
		
		return elements;
	};
	
	$.fn[cover].defaults = {
		position: 'center center',
		src: null,
		loader: null
	};
	
	$.fn[cover].supported = (function () {
		var e = document.createElement('div');
		e.style.cssText = 'background-size:cover;';
		return e.style.backgroundSize === 'cover' && false;
	})();
	
	$.fn[cover].version = version;
	
})(jQuery, this, this.document, 'cover', '0.1');
