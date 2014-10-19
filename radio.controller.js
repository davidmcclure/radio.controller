

/**
 * @package radio.controller
 * @copyright 2014 David McClure
 * @license wtfpl
 */


var _ = require('underscore');
var Backbone = require('backbone');
var Radio = require('backbone.radio');


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
 * Create radio channels, bind callbacks.
 */
Controller.prototype._listen = function() {

  // create each channel
  // bind events/commands/requests

  var self = this;

  _.each(this.radio, function(bindings, name) {

    // Register the channel.
    var channel = Radio.channel(name);

    // Bind events.
    self._bind(bindings.events, function(event, method) {
      channel.on(event, _.bind(self[method], self));
    });

  });

};


/**
 * Bind a set of event mappings onto controller callbacks.
 *
 * - If the identifier is a string, bind the event directly to the method
 *   on the controller with the same name.
 *
 * - If the identifier is an object, treat the keys as event names and the
 *   values as the corresponding controller methods.
 *
 * @param {Array} map: An array of strings/objects.
 * @param {Function} bind: A binding method.
 */
Controller.prototype._bind = function(map, bind) {
  _.each(map, function(identifier) {

    // If string, bind to method with same name.
    if (_.isString(identifier)) {
      bind(identifier, identifier);
    }

    // If object, bind each event-callback pair.
    else if (_.isObject(identifier)) {
      _.each(identifier, function(v, k) {
        bind(k, v)
      });
    }

  });
};
