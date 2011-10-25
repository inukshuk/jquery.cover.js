describe('$.fn.cover', function () {
	
	it('should be defined', function () {
		expect($().cover).toBeDefined();
	});
	
	it('should be a function', function () {
		expect($.isFunction($().cover)).toBeTruthy();
	});
	
	describe('$.fn.activate.defaults', function () {
		it('should be defined', function () {
			expect($.fn.cover.defaults).toBeDefined();
		});
	});
	
});
