

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
  resolver && resolver(function(value) {
    fulfilled.map(cb => cb && cb(value))
  }, function(reason) {
    rejected.map(cb => cb && cb(reason))
  })
  return {
    then: function(success, error) {
      if(typeof success != 'function') success = function(value) {
        return value
      }

      if(typeof error != 'function') error = function(reason) {
        return reason
      }

      return promise(function(resolve, reject) {
        fulfilled.push(function(value) {
          try {
            resolve(success(value))
          } catch(e) {
            reject(e)
          }
        })
        rejected.push(function(reason) {
          try {
            reject(error(reason))
          } catch(e) {
            reject(e)
          }
        })
      })
    }
  }
}
