var Promise = require('..'),
assert = require('assert');

describe("API", function() {
	var promise;
	beforeEach(function() {
		promise = new Promise();
	});
	
	it("should have a then handler", function() {
		assert(promise.then);
	});

	it("should have a resolve handler", function() {
		assert(promise.resolve);
	});

	it("should have a reject handler", function() {
		assert(promise.reject);
	});		
	
});

describe("Basic", function() {

	var promise;
	beforeEach(function() {
		promise = new Promise();
	});

	it("should resolve a promise", function(done) {
		promise.then(function() {
			done();
		});
		promise.resolve();
	});
	
});

