

/**
 *
 */

module.exports = function(resolver) {
  var fulfilled = []
  var rejected = []
  resolver && resolver(function(value) {
    fulfilled.map(cb => cb && cb(value))
  }, function(reason) {
    rejected.map(cb => cb && cb(reason))
  })
  return {
    then: function(success, error) {
      fulfilled.push(success)
      rejected.push(error)
    }
  }
}
