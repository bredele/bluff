
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
 * @param {Function} resolver
 * @return thenable
 * @api public
 */

function bluff(resolver) {
  if(arguments.length > 1) {
    return promise(all.bind(null, [].slice.call(arguments)))
  } else {
    return promise(typeof resolver == 'function'
      ? resolver
      : function(resolve, reject) {
        if(typeof resolver.then == 'function') resolver.then(resolve, reject)
        else resolve(resolver)
      }
    )
  }
}


/**
 * Combine multiple promises and/or value
 * and return resolver function.
 *
 * @param {Array} args
 * @param {Function} resolve
 * @param {Function} reject
 * @return {Function}
 * @api public
 */

function all(args, resolve, reject) {
  var result = []
  var length = args.length - 1
  args.map(function(item, i) {
    bluff(item).then(function(value) {
      result.push(value)
      if(i == length) resolve(result)
    }, function(reason) {
      reject(reason)
    })
  })
}


/**
 * Promise A+ implementation.
 *
 * @param {Function} resolver
 * @return thenable
 * @api public
 */

bluff.promise = promise
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
              var result = fulfill(value)
              if(typeof result.then == 'function') {
                result.then(success)
              } else {
                success(result)
              }
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
