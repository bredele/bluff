var Promise = require('..'),
assert = require('assert');

describe("API", function() {
	var promise;
	beforeEach(function() {
		promise = new Promise();
	});
	
	it("must provide a then method", function() {
		assert(promise.then);
	});

	it("must provide a resolve method", function() {
		assert(promise.resolve);
	});

	it("must provide a reject method", function() {
		assert(promise.reject);
	});		
	
});

describe("Basic", function() {

	var promise;
	beforeEach(function() {
		promise = new Promise();
	});

	describe("resolve", function() {
		
		it("should resolve a promise", function(done) {
			promise.then(function() {
				done();
			});
			promise.resolve();
		});

		it('should resolve a promise only once', function() {
			var idx = 0;
			promise.then(function() {
				idx++;
			});
			promise.resolve();
			promise.resolve();
			promise.resolve();
			assert.equal(idx, 1);
		});

		it('may call then multiple times', function() {
			var idx = 0;
			promise.then(function() {
				idx++;
			});
			promise.then(function() {
				idx++;
			});
			promise.resolve();
			assert.equal(idx, 2);
		});

		it('should resolve a promise with a reason', function(done) {
			var reason = 'this is the reason';
			promise.then(function(val) {
				if(val === reason) done();
			});
			promise.resolve(reason);
		});
	});
	
	describe("reject", function() {
		
		it('should reject a promise', function(done) {
			promise.then(null, function() {
				done();
			});
			promise.reject();
		});		
	});

	
});

