
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

Promise.thenable = function(obj) {
	return obj.then ? true : false;
};

//is an emitter

require('component-emitter')(Promise.prototype);


/**
 * Register callback to get promise value.
 * 
 * @param  {Function} fulfilled 
 * @param  {Function} rejected 
 * @return {Promise}
 * @api public
 */

Promise.prototype.then = function(fulfilled, rejected) {
	this.once('resolved', fulfilled);
	this.once('rejected', rejected);
};


/**
 * Resolve promise and set state
 * to fulfilled.
 *
 * @event resolved
 * @param  {Any} reason 
 * @api public
 */

Promise.prototype.resolve = function(reason) {
	this.state = 'fulfilled';
	this.emit('resolved', reason);
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