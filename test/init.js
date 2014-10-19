

var Controller = require('../radio.controller');
var assert = require('chai').assert;


describe('Initialize', function() {

  it('should set the passed options', function() {
    var c = new Controller({ key: 'val' });
    assert.deepEqual(c.options, { key: 'val' });
  });

});
