

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
      if(typeof success != 'function') success = function(value) {
        return value
      }

      if(typeof error != 'function') error = function(reason) {
        return reason
      }
      resolver && resolver(function(value) {
        var val
        try {
          val = success(value)
          fulfilled.map(function(cb) {
            cb(val || value)
          })
        } catch(e) {
          rejected.map(function(cb) {
            cb(e)
          })
        }

      }, function(reason) {
        var val
        try {
          val = error(reason)
          rejected.map(function(cb) {
            cb(val || reason)
          })
        } catch(e) {
          rejected.map(function(cb) {
            cb(e)
          })
        }
      })
      return promise(function(resolve, reject) {
        fulfilled.push(resolve)
        rejected.push(reject)
      })
    }
  }
}
