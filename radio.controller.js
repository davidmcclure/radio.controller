

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

  // EVENTS
  _.each(this.events, function(map, name) {
    var channel = Radio.channel(name);
    _.each(map, function(method, event) {
      channel.on(event, self[method], self);
    });
  });

  if (_.isObject(this.commands) ||
      _.isObject(this.requests)) {

    if (!_.isString(this.channel)) {
      throw new Error('You must provide a local channel name.');
    }

    this.channel = Radio.channel(this.channel);

    // COMMANDS
    _.each(this.commands, function(method, command) {
      self.channel.comply(command, self[method], self);
    });

    // REQUESTS
    _.each(this.requests, function(method, request) {
      self.channel.reply(request, self[request], self);
    });

  }

};


module.exports = Controller;
