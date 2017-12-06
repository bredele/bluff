/**
 * Dependencies
 */

var thenable = require('stream-then')



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
 * @return {Promise}
 * @api public
 */

module.exports = function (value) {
  return arguments.length > 1
    ? Promise.all([].map.call(arguments, resolver))
    : resolver(value)
}


/**
 * Resolve value into a promise.
 *
 * If a value is different than a function or a stream, the value
 * will be resolved into a promise. For a stream, resolver will
 * return a promise that is rejected if any error, resolved otherwise.
 *
 * @param {Any} value
 * @return {Promise}
 */

function resolver (value) {
  if (typeof value === 'function') return new Promise(value)
  else if (value != null && typeof value === 'object' && typeof value.pipe === 'function') {
    return thenable(value, true)
  }
  return Promise.resolve(value)
}
