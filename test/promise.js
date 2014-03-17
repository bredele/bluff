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

describe("utils", function() {
	describe("thenable", function() {
		it("returns true if object or function defines a then method", function() {
			assert(!Promise.thenable({}));
			assert(!Promise.thenable(function(){}));
			assert(Promise.thenable({then:function(){}}));		
		});
		
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

		it('should reject only once', function() {
			var idx = 0;
			promise.then(null, function() {
				idx++;
			});
			promise.reject();
			promise.reject();
			promise.reject();
			assert.equal(idx, 1);
		});

	});

	describe("state", function() {

		it("should be pending by default", function() {
			assert.equal(promise.state, 'pending');
		});

		it('should be fulfilled if resolved', function() {
			promise.resolve();
			assert.equal(promise.state, 'fulfilled');
		});

		it('should be rejected if rejected', function() {
			promise.reject();
			assert.equal(promise.state, 'rejected');
		});

		it('must not transition to any other state when fulfilled', function() {
			promise.resolve();
			promise.reject();
			assert.equal(promise.state, 'fulfilled');
		});

		it('cannot reject a promise that has already be resolved', function() {
			var idx = 0;
			promise.then(function() {
				idx = 1;
			}, function() {
				idx = 0;
			});
			promise.resolve();
			promise.reject();
			assert.equal(idx, 1);
		});
		
	});

	describe("then", function() {

		it("should return a promise", function() {
			var promise2 = promise.then();
			assert(Promise.thenable(promise2));
		});

		it('must fill the return promise with the same value if not a function', function(done) {
			var promise2 = promise.then();
			promise2.then(function(val) {
				if(val === 'hello') done();
			});
			promise.resolve('hello')
		});

		it("must reject the return promise with the same reason if not a function", function(done) {
			var promise2 = promise.then();
			promise2.then(null, function(val) {
				if(val === 'hello') done();
			});
			promise.reject('hello')
		});
		
		
	});
	
	

	
});

