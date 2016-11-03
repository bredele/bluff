/**
 * Tests dependencies.
 */

var test = require('tape')
var bluff = require('..')


test('should return a promise from a value different than a promise or function', assert => {
  assert.plan(1)
  var promise = bluff('hello')
  promise.then(function(value) {
    assert.equal(value, 'hello')
  })
})

test('should return a promise passed as argument', assert => {
  assert.plan(1)
  var promise = bluff(function(resolve) {
    setTimeout(() => {
      resolve('hello')
    }, 500)
  })
  bluff(promise).then(function(value) {
    assert.equal(value, 'hello')
  })
})


test('should combine and resolve multiple promises into a single promise', assert => {
  assert.plan(1)
  var first = bluff('hello')
  var second = bluff(function(resolve) {
    setTimeout(() => resolve('world'), 700)
  })
  bluff(first, second).then(function(value) {
    assert.deepEqual(value, ['hello', 'world'])
  })
})

// 
// test('should combine and reject multiple promises into a single promise', assert => {
//   assert.plan(1)
//   var first = bluff('hello')
//   var second = bluff(function(resolve, reject) {
//     setTimeout(() => reject('second failed'), 700)
//   })
//   bluff(first, second).then(null, function(reason) {
//     assert.equal(reason, 'second failed')
//   })
// })
