
/**
 * Promise A+ implementation.
 *
 * @param {Function} resolver
 * @return thenable
 * @api public
 */

module.exports = function promise(resolver) {
  var fulfilled = []
  resolver(function(value) {
    fulfilled.map(function(cb) {
      cb(value)
    })
  })
  return {
    then: function(fulfill, reject) {
      fulfilled.push(fulfill)
    }
  }
}
