/**
 * Tests dependencies.
 */

var test = require('tape')
var bluff = require('..')


test('should return a thenable', assert => {
	assert.plan(1)
	var promise = bluff()
	assert.equal(typeof promise.then, 'function')
})
