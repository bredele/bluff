
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
	this.once('resolve', fulfilled);
};

Promise.prototype.resolve = function(reason) {
	this.emit('resolve', reason);
};

Promise.prototype.reject = function() {
	
};