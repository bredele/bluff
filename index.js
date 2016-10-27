
/**
 * Promise A+ implementation.
 *
 * @param {Function} resolver
 * @return thenable
 * @api public
 */

module.exports = function promise(resolver) {
  var state = 'pending'
  var result
  var fulfilled = []
  var rejected = []
  resolver(function(value) {
    state = 'fulfilled'
    result = value
    fulfilled.map(function(cb) {
      cb(value)
    })
  }, function(reason) {
    state = 'rejected'
    result = reason
    rejected.map(function(cb) {
      cb(reason)
    })
  })
  return {
    then: function(fulfill, reject) {
      if(state == 'pending') {
        fulfilled.push(fulfill)
        rejected.push(reject)
      } else if(state == 'fulfilled') fulfill(result)
      else reject(result)
    }
  }
}
