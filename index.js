
/**
 * Expose `bluff`
 */

module.exports = function(resolver) {
  var bool = typeof resolver == 'function'
  return promise(bool
    ? resolver
    : function(resolve, reject) {
      if(typeof resolver.then == 'function') resolver.then(resolve)
      else resolve(resolver)
    })
}


/**
 * Promise A+ implementation.
 *
 * @param {Function} resolver
 * @return thenable
 * @api public
 */

function promise(resolver) {
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
      if(typeof fulfill != 'function') fulfill = function(value) {
        return value
      }
      if(typeof reject != 'function') reject = function(reason) {
        return reason
      }
      return promise(function(success, error) {
        if(state == 'pending') {
          fulfilled.push(function(value) {
            try {
              success(fulfill(value))
            } catch(e) {
              error(e)
            }
          })
          rejected.push(function(reason) {
            try {
              error(reject(reason))
            } catch(e) {
              error(e)
            }
          })
        } else if(state == 'fulfilled') success(fulfill(result))
        else error(reject(result))
      })
    }
  }
}
