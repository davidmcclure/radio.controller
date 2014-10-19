

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

  this._tune();

};


// Borrow Backbone's `extend` pattern.
Controller.extend = Backbone.Model.extend;


/**
 * Create radio channels, bind callbacks.
 */
Controller.prototype._tune = function() {

  var self = this;

  _.each(this.radio, function(bindings, name) {
    var channel = Radio.channel(name);
    self._bind(bindings.events, channel.on);
  });

};


/**
 * Bind a set of event definitions onto callbacks.
 *
 * @param {Array} definitions: An array of strings/objects.
 * @param {Function} bind: A radio binding method.
 */
Controller.prototype._bind = function(definitions, bind) {

  var self = this;

  _.each(definitions, function(def) {

    // If string, bind to method with same name.
    if (_.isString(def)) {
      bind(def, _.bind(self[def], self));
    }

    // If object, bind each event-method pair.
    else if (_.isObject(def)) {
      _.each(def, function(method, event) {
        bind(event, _.bind(self[method], self))
      });
    }

  });

};
