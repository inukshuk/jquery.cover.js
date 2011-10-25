describe('$.fn.cover', function () {
	
	it('is defined for jQuery objects', function () {
		expect($().cover).toBeDefined();
	});
	
	it('is a function', function () {
		expect($.isFunction($().cover)).toBeTruthy();
	});
	
	describe('$.fn.activate.defaults', function () {
		it('is defined', function () {
			expect($.fn.cover.defaults).toBeDefined();
		});
	});

	describe('$.fn.cover.supported', function () {
		it('is defined', function () {
			expect($.fn.cover.supported).toBeDefined();
		});
		
		it('is a predicate', function () {
			expect($.fn.cover.supported === true || $.fn.cover.supported === false).toBeTruthy();
		});
	});

	
});
