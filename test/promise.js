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

test('returned promise should take as value the value returned by the previous promise', assert => {
	assert.plan(1)
	bluff(function(resolve) {
		setTimeout(function() {
			resolve('hello')
		}, 100)
	}).then(function(value) {
		return value + ' world'
	}).then(function(value) {
		assert.equal(value, 'hello world')
	})
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

test('returned promise should be reject with e as the reason if exception is trigerred in fulfilled then', assert => {
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

test('returned promise should be reject with e as the reason if exception is trigerred in rejected then', assert => {
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
