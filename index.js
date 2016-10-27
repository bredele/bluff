
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
      cb(result)
    })
  }, function(reason) {
    state = 'rejected'
    result = reason
    rejected.map(function(cb) {
      cb(result)
    })
  })
  return {
    then: function(fulfill, reject) {
      return promise(function(success, error) {
        if(state == 'pending') {
          fulfilled.push(function(value) {
            success(fulfill(value))
          })
          rejected.push(function(reason) {
            error(reject(reason))
          })
        } else if(state == 'fulfilled') success(fulfill(result))
        else error(reject(result))
      })
    }
  }
}
