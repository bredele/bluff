
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
	} else if(typeof x === 'object' || typeof x === 'function') {
		//NOTE:refactor if with thenable
		var then = x.then;
	} else {
		promise.resolve(x);
	}
};


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
	this.once('resolve', function(val) {
		if(typeof fulfilled !== 'function') return promise.resolve(val);
		try {
			fulfilled(val);
		} catch(e) {
			promise.reject(e);
		}
	});
	this.once('reject', function(val) {
		if(typeof rejected !== 'function') return promise.reject(val);
		try {
			rejected(val);
		} catch(e) {
			promise.reject(e);
		}
	});
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