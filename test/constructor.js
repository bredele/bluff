/**
 * Tests dependencies.
 */

var test = require('tape')
var bluff = require('..')


test('should return a promise from a value different than a promise or function', assert => {
  assert.plan(1)
  var promise = bluff({
    hello: 'world'
  })
  promise.then(function(value) {
    assert.deepEqual(value, {
      hello: 'world'
    })
  })
})
