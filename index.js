
/**
 * Expose 'Promise'
 */

module.exports = Promise;


/**
 * Promise constructor.
 * @api public
 */

function Promise() {
  //do something
}


//is an emitter

require('component-emitter')(Promise.prototype);


Promise.prototype.then = function(fulfilled, rejected) {
	this.once('resolved', fulfilled);
	this.on('rejected', rejected);
};

Promise.prototype.resolve = function(reason) {
	this.emit('resolved', reason);
};

Promise.prototype.reject = function() {
	this.emit('rejected');
};