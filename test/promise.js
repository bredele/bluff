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
