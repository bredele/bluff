
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
  resolver(function(value) {
    state = 'fulfilled'
    result = value
    fulfilled.map(function(cb) {
      cb(value)
    })
  })
  return {
    then: function(fulfill, reject) {
      if(state != 'fulfilled') fulfilled.push(fulfill)
      else fulfill(result)
    }
  }
}
