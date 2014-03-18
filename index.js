
/**
 * Expose 'Promise'
 */

module.exports = Promise;


/**
 * Promise constructor.
 * @api public
 */

function Promise() {
  this.state = 'pending';
}

//is an emitter

require('component-emitter')(Promise.prototype);


/**
 * Return true if contains then method.
 * 
 * @param  {Object|Function} obj 
 * @return {Boolean}
 * @api public
 */

Promise.thenable = function(obj) {
  return (typeof obj.then === 'function') ? true : false;
};




Promise.resolver = function(promise, x) {
  if(promise === x) return promise.reject(new TypeError('objects same type'));
  if(this.thenable(x)) {
    //NOTE:to refactor
    x.then(function(val) {
      promise.resolve(val)
    }, function(reason) {
      promise.reject(reason);
    });
  } 
  // else if(typeof x === 'object' || typeof x === 'function') {
  //  //NOTE:refactor if with thenable
  //  var then = x.then;
  //  then.call(x, function(val) {
  //    Promise.resolve(promise, val);
  //  }, function(reason) {
  //    promise.reject(reason);
  //  });

  // } 
  else {
    promise.resolve(x);
  }
};


/**
 * Register once a fulfilled or rejected
 * callback.
 * 
 * @param  {String}   state   
 * @param  {Promise}   promise 
 * @param  {Function} fn    
 * @return {Function} 
 * @api private
 */

function once(state, promise, fn) {
  return function(val) {
    if(typeof fn !== 'function') return promise[state](val);
    try {
      var x = fn(val);
      if(x) Promise.resolver(promise, x);
    } catch(e) {
      promise.reject(e);
    }
  }
}


/**
 * Register callback to get promise value.
 * 
 * @param  {Function} fulfilled 
 * @param  {Function} rejected 
 * @return {Promise}
 * @api public
 */

Promise.prototype.then = function(fulfilled, rejected) {
  var promise = new Promise();
  this.once('resolve', once('resolve', promise, fulfilled));
  this.once('reject', once('reject', promise, rejected));
  return promise;
};


/**
 * Resolve promise and set state
 * to fulfilled.
 *
 * @event resolved
 * @param  {Any} reason 
 * @api public
 */

Promise.prototype.resolve = function(value) {
  this.state = 'fulfilled';
  this.emit('resolve', value);
};


/**
 * Reject promise and set state
 * to rejected.
 *
 ** @param  {Any} reason 
 * @api public
 */

Promise.prototype.reject = function(reason) {
  if(this.state !== 'fulfilled') {
    this.state = 'rejected';
    this.emit('reject', reason);
  }
};