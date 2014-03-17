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
	
});
