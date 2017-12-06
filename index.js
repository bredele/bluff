
/**
 * Expose `bluff`
 */

module.exports = bluff


/**
 * Bluff constructor.
 *
 * The bluff function accepts functions, promises or any type of
 * argument (the argument will be returned as the promise value).
 * When multiple arguments, bluff will create promises for every argument
 * and combine them.
 *
 * Examples:
 *
 *  bluff(function(resolve, reject) {})
 *  bluff(promise)
 *  bluff('hello')
 *  bluff('hello', promise, function(resolve, reject) {})
 *
 * @param {Function} value
 * @return thenable
 * @api public
 */

function bluff(value) {
  if(arguments.length > 1) {
    return Promise.all([].map.call(arguments, resolver))
  } else {
    return resolver(value)
  }
}

function resolver (value) {
  if (typeof value === 'function') return new Promise(value)
  return Promise.resolve(value)
}
