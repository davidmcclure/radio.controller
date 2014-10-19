

/**
 * @package radio.controller
 * @copyright 2014 David McClure
 * @license wtfpl
 */


var _ = require('underscore');


/**
 * Set options, initialize, bind callbacks.
 *
 * @param {Object} options
 */
var Controller = module.exports = function(options) {

  this.options = options || {};

  // Call userland initializer.
  if (_.isFunction(this.initialize)) {
    this.initialize(this.options);
  }

  this._listen();

};


/**
 * Bind callback mappings in the `radio` attribute.
 */
Controller.prototype._listen = function() {
  console.log(_);
};
