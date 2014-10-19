

/**
 * @package radio.controller
 * @copyright 2014 David McClure
 * @license wtfpl
 */


var _ = require('underscore');
var Backbone = require('backbone');


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


// Borrow Backbone's `extend` pattern.
Controller.extend = Backbone.Model.extend;


/**
 * Bind callback mappings in the `radio` attribute.
 */
Controller.prototype._listen = function() {

  _.each(this.radio, function(channel, mappings) {

    if (mappings.events) {
      // TODO
    }

    if (mappings.commands) {
      // TODO
    }

    if (mappings.requests) {
      // TODO
    }

  });

};