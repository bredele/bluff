

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
          resolve(success(value))
        })
        rejected.push(function(reason) {
          reject(error(reason))
        })
      })
    }
  }
}
