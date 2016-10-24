/**
 * Tests dependencies.
 */

var test = require('tape')
var bluff = require('..')


test('should return a thenable object', assert => {
	assert.plan(1)
	var promise = bluff()
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

	promise.then(null, function(value) {
		assert.equal(value, 'hello')
		assert.equal(result, 'hello')
	})
})

test('then must return a promise', assert => {
	assert.plan(1)
	var promise = bluff().then()
	assert.equal(typeof promise.then, 'function')
})
