;(function ($, window, document, cover, version, undefined) {
	
	var aCover = function (element, options) {
		var my = {};
		
		my.dom = element;
		my.$ = $(element);

		my.images = { q: [], current: 0 };		
		my.options = options;
		
		if (!$.isArray(my.options.src)) {
			my.options.src = [my.options.src];
		}

		// preload images
		$.each(my.options.src, function (i) {
			var image = new Image;
			image.onload = function () {
				my.images.q[i] = image;
			};
			image.src = this;
		});

		my.resize = function (image) {
			var position, image = image || this.$.find('img:first')[0], img, iw, ih,
				w = this.$.width(), h = this.$.height();

			// fetch real image dimension
			img = new Image;
			img.src = image.src, iw = img.width, ih = img.height;

			if (iw / ih < w / h) {
				image.width = w;
				$(image).removeAttr('height');

				switch (this.options.position.split(/\s+/)[1].toLowerCase()) {
					case 'center':
						position = 'top:' + (-h / 2) + 'px;';
						break;
					case 'bottom':
						position = 'bottom:0;';
						break;
					default:
						position = 'top:0;';
				}
			}
			else {
				image.height = h;
				$(image).removeAttr('width');

				switch (this.options.position.split(/\s+/)[0].toLowerCase()) {
					case 'center':
						position = 'left:' + (-w / 2) + 'px;';
						break;
					case 'right':
						position = 'right:0;';
						break;
					default:
						position = 'left:0;';
				}
			}
			
			image.style.cssText = 'position:absolute;' + position;
			
		};

		my.play = function () {
			var self = this;

			self.images.interval = window.setInterval(function () {
				self.next();
			}, self.options.timeout);
			
			return this;
		};
		
		my.pause = function () {
			if (this.images.interval) {
				window.clearInterval(this.images.interval);
				this.images.interval = false;
			}
			
			return this;
		};
		
		my.cover_css = function (image) {
			this.$.css({
				'background-image': ['url(', image.src, ')'].join(''),
				'background-position': this.options.position,
				'background-size': 'cover'
			});

			return this;
		};		
		
		my.next_css = function () {
			var self = this, offset = (self.images.current + 1) % self.images.q.length, next;
			
			if (offset !== self.images.current) {
				next = $('<div/>').css({
					'background-image': ['url(', self.images.q[offset].src, ')'].join(''),
					'background-position': self.options.position,
					'background-size': 'cover',
					'position': 'absolute',
					'top': 0,
					'width': self.$.outerWidth(),
					'height': self.$.outerHeight(),
					'opacity': 0
				});
				
				self.$.css({ position: 'relative', overflow: 'hidden' }).prepend(next);
				
				next.animate({ opacity: 1 }, self.options.duration, self.options.easing, function () {
					self.cover(self.images.q[offset]);
					self.images.current = offset;
					next.remove();
				});
			}
			
			return this;
		};
		
	
		my.cover_img = function (image) {
			var self = this;

			self.resize(image);
			self.$.css({ position: 'relative', overflow: 'hidden' }).prepend(image);
			
			$(window).unbind('resize.cover').bind('resize.cover', function () {
				self.resize();
			});
			
			return this;
		};

		my.next_img = function () {
			var self = this, offset = (self.images.current + 1) % self.images.q.length,
				next, current;
			
			if (offset !== self.images.current) {
				next = self.images.q[offset];
				self.resize(next, next.width, next.height);
				
				next = $(next).css({ opacity: 0 });
				current = self.$.find('img:first');

				current.after(next);
				next.animate({ opacity: 1 }, self.options.duration, self.options.easing, function () {
					self.images.current = offset;
					current.remove();
				});
			}
			
			return this;
		};

		
		if ($.fn.cover.supported) {
			my.cover = my.cover_css;
			my.next = my.next_css;
		}
		else {
			my.cover = my.cover_img;
			my.next = my.next_img;			
		}
		
		
		return my;
	};
			 
	$.fn[cover] = function (args) {
		var elements = this, options, image;
		
		if (elements.length) {
			
			// parse arguments
			
			if (typeof args === 'string') {
				if (elements.data(cover) && elements.data(cover)[args]) {
					return elements.data(cover)[args]();
				}
				else {
					options = $.extend({}, $.fn.cover.defaults, { src: args });					
				}
			}
			else if ($.isArray(args)) {
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
				elements.each(function () {
					var e = $(this), c = e.data(cover) || aCover(this, options);					
					
					c.cover(image);
					if (options.play) { c.play(); }
					
					e.data(cover, c);
				});
			};
			image.src = $.isArray(options.src) ? options.src[0] : options.src;
			
		}
		
		return elements;
	};
	
	$.fn[cover].defaults = {
		position: 'center center',
		src: null,
		loader: null,
		duration: 500,
		timeout: 5000,
		easing: 'swing',
		play: false
	};
	
	$.fn[cover].supported = (function () {
		var e = document.createElement('div');
		e.style.cssText = 'background-size:cover;';
		return e.style.backgroundSize === 'cover';
	})();
	
	$.fn[cover].version = version;
	
})(jQuery, this, this.document, 'cover', '0.4');
