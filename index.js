
/**
 * Promise A+ implementation.
 *
 * @param {Function} resolver
 * @return thenable
 * @api public
 */

module.exports = function promise(resolver) {
  var fulfilled = []
  var rejected = []
  return {
    then: function(success, error) {
      resolver && resolver(
        resolution(callback(success), fulfilled, rejected),
        resolution(callback(error), rejected, rejected)
      )
      return promise(function(resolve, reject) {
        fulfilled.push(resolve)
        rejected.push(reject)
      })
    }
  }
}


/**
 * Transform value into function.
 *
 * @return {Any} cb
 * @return {Function}
 * @ api private
 */

function callback(cb) {
  return typeof cb != 'function'
    ? function(value) {
      return value
    } : cb
}


/**
 * Promise resolution procedure.
 *
 * @param {Function} cb
 * @param {Array} fulfilled callbacks
 * @param {Array} rejected callbacks
 * @return {Function}
 * @api private
 */

function resolution(cb, fulfilled, rejected) {
  return function(value) {
    var returned
    try {
      returned = cb(value)
      fulfilled.map(function(fn) {
        fn(returned || value)
      })
    } catch(e) {
      rejected.map(function(fn) {
        fn(e)
      })
    }
  }
}
