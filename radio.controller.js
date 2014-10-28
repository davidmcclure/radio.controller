

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
var Controller = function(options) {

  this.options = options || {};

  // Call userland initializer.
  if (_.isFunction(this.initialize)) {
    this.initialize(this.options);
  }

  this._tune();

};


// Patch in Backbone's `extend`.
Controller.extend = Backbone.Model.extend;


/**
 * Create radio channels, bind callbacks.
 */
Controller.prototype._tune = function() {

  var self = this;

  _.each(this.radio, function(bindings, name) {

    var channel = Radio.channel(name);

    // EVENTS
    self._bind(bindings.events, function(e, m) {
      channel.on(e, _.bind(self[m], self));
    });

    // COMMANDS
    self._bind(bindings.commands, function(e, m) {
      channel.comply(e, _.bind(self[m], self));
    });

    // REQUESTS
    self._bind(bindings.requests, function(e, m) {
      channel.reply(e, _.bind(self[m], self));
    });

  });

};


/**
 * Bind a set of event definitions onto callbacks.
 *
 * @param {Array} map: An array of event mappings.
 * @param {Function} bind: A radio binding method.
 */
Controller.prototype._bind = function(map, bind) {

  var self = this;

  _.each(map, function(method, event) {
    bind(event, method)
  });

};


module.exports = Controller;
