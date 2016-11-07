/**
 * Tests dependencies.
 */

var test = require('tape')
var bluff = require('..')


test('should return a thenable object', assert => {
	assert.plan(1)
	var promise = bluff(function() {

	})
	assert.equal(typeof promise.then, 'function')
})

test('then must be called after promise is fulfilled with value as its first argument', assert => {
	assert.plan(1)
	var promise = bluff(function(resolve) {
		setTimeout(function() {
			resolve('hello')
		}, 100)
	})

	promise.then(function(value) {
		assert.equal(value, 'hello')
	})
})

test('then should work with synchronous call to resolve', assert => {
	assert.plan(1)
	var promise = bluff(function(resolve) {
		resolve('hello')
	})

	promise.then(function(value) {
		assert.equal(value, 'hello')
	})
})


test('then must be called after promise is rejected with reason as its first argument', assert => {
	assert.plan(1)
	var promise = bluff(function(resolve, reject) {
		setTimeout(function() {
			reject('hello')
		}, 100)
	})

	promise.then(null, function(reason) {
		assert.equal(reason, 'hello')
	})
})

test('then should work with synchronous call to reject', assert => {
	assert.plan(1)
	var promise = bluff(function(resolve, reject) {
		reject('hello')
	})

	promise.then(null, function(reason) {
		assert.equal(reason, 'hello')
	})
})


test('then may be called multiple times on the same promise if resolved', assert => {
	assert.plan(2)
	var result
	var promise = bluff(function(resolve) {
		setTimeout(function() {
			resolve('hello')
		}, 100)
	})

	promise.then(function(value) {
		result = value
	})

	promise.then(function(value) {
		assert.equal(value, 'hello')
		assert.equal(result, 'hello')
	})
})

test('then may be called multiple times before or after promise has been resolved', assert => {
	assert.plan(2)
	var result
	var promise = bluff(function(resolve) {
		setTimeout(function() {
			resolve('hello')
		}, 100)
	})

	promise.then(function(value) {
		result = value
	})

	setTimeout(function() {
		promise.then(function(value) {
			assert.equal(value, 'hello')
			assert.equal(result, 'hello')
		})
	}, 400)

})


test('then may be called multiple times on the same promise if rejected', assert => {
	assert.plan(2)
	var result
	var promise = bluff(function(resolve, reject) {
		setTimeout(function() {
			reject('hello')
		}, 100)
	})

	promise.then(null, function(value) {
		result = value
	})


	setTimeout(function() {
		promise.then(null, function(value) {
			assert.equal(value, 'hello')
			assert.equal(result, 'hello')
		})
	}, 400)

})

test('then must return a promise', assert => {
	assert.plan(1)
	var promise = bluff(function() {}).then()
	assert.equal(typeof promise.then, 'function')
})

test('returned promise should take as value the value returned by the previous promise', assert => {
	assert.plan(2)
	var promise = bluff(function(resolve) {
		setTimeout(function() {
			resolve('hello')
		}, 100)
	}).then(function(value) {
		return value + ' world'
	})

  setTimeout(function() {
		promise.then(function(value) {
			assert.equal(value, 'hello world')
		})
		promise.then(function(value) {
			assert.equal(value, 'hello world')
		})
	}, 400)
})

test('returned promise should take as reason the reason returned by the previous promise', assert => {
	assert.plan(1)
	bluff(function(resolve, reject) {
		setTimeout(function() {
			reject('hello')
		}, 100)
	}).then(null, function(reason) {
		return reason + ' world'
	}).then(null, function(reason) {
		assert.equal(reason, 'hello world')
	})
})

test('If onFullfilled throws an exception e, promise2 must be rejected with e as the reason.', assert => {
	assert.plan(1)
	bluff(function(resolve) {
		setTimeout(function() {
			resolve('hello')
		}, 100)
	}).then(function(value) {
		throw 'this is an exception'
	}).then(null, function(reason) {
		assert.equal(reason, 'this is an exception')
	})
})

test('If onRejected throws an exception e, promise2 must be rejected with e as the reason.', assert => {
	assert.plan(1)
	bluff(function(resolve, reject) {
		setTimeout(function() {
			reject('hello')
		}, 100)
	}).then(null, function(value) {
		throw 'this is an exception'
	}).then(null, function(reason) {
		assert.equal(reason, 'this is an exception')
	})
})

test('If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1', assert => {
	assert.plan(1)
	bluff(function(resolve) {
		setTimeout(function() {
			resolve('hello')
		}, 100)
	}).then(null).then(function(value) {
		assert.equal(value, 'hello')
	})
})

test('If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1', assert => {
	assert.plan(1)
	bluff(function(resolve, reject) {
		setTimeout(function() {
			reject('hello')
		}, 100)
	}).then(null, null).then(null, function(reason) {
		assert.equal(reason, 'hello')
	})
})

test('if value returned by promise 1 is a fulfilled promise, fulfill promise2 with the same value', assert => {
	assert.plan(1)
	bluff('hello')
	  .then(value => bluff(value + ' world'))
		.then(value => assert.equal(value, 'hello world'))
})
