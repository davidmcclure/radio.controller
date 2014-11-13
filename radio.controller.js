

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

  this._bindEvents();
  this._bindCommandsAndRequests();

};


// Patch in Backbone's `extend`.
Controller.extend = Backbone.Model.extend;


/**
 * Bind event mappings.
 */
Controller.prototype._bindEvents = function() {

  var self = this;

  _.each(this.events, function(map, key) {

    // Nested object style.
    if (_.isObject(map)) {

      var channel = Radio.channel(key);

      // Bind all pairs in the object.
      _.each(map, function(method, event) {
        channel.on(event, self[method], self);
      });

    }

    // Backbone event style.
    else if (_.isString(map)) {

      // Match `<channel> <method>` keys.
      var m = key.match(/^(\S+)\s*(.*)$/);
      Radio.channel(m[1]).on(m[2], self[map], self);

    }

  });

};


/**
 * Bind command and request mappings to the local channel.
 */
Controller.prototype._bindCommandsAndRequests = function() {

  var self = this;

  if (_.isObject(this.commands) ||
      _.isObject(this.requests)) {

    // Break if no local channel.
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
