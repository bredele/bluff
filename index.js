
/**
 * Promise A+ implementation.
 *
 * @param {Function} resolver
 * @return thenable
 * @api public
 */

module.exports = function promise(resolver) {
  resolver()
  return {
    then: function() {
      
    }
  }
}
