

/**
 *
 */

module.exports = function(resolver) {
  var cbs = []
  resolver && resolver(function(value) {
    cbs.map(fn => fn(value))
  })
  return {
    then: function(onFulfilled) {
      cbs.push(onFulfilled)
    }
  }
}
