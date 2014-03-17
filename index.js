
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


Promise.prototype.then = function(fulfilled, rejected) {
	this.once('resolved', fulfilled);
	this.once('rejected', rejected);
};

Promise.prototype.resolve = function(reason) {
	this.state = 'fulfilled';
	this.emit('resolved', reason);
};

Promise.prototype.reject = function() {
	if(this.state !== 'fulfilled') {
		this.state = 'rejected';
		this.emit('rejected');
	}
};