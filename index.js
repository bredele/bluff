
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
	this.once('resolved', function(val) {
		if(typeof fulfilled !== 'function') return promise.resolve(val);
		fulfilled(val);
	});;
	this.once('rejected', function(val) {
		if(typeof rejected !== 'function') return promise.reject(val);
		rejected(val);
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
	this.emit('resolved', value);
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
		this.emit('rejected', reason);
	}
};