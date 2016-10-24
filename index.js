

/**
 *
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
