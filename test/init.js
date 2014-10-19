

var Controller = require('../radio.controller');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;


describe('Initialize', function() {

  it('should set the passed options', function() {
    var ctl = new Controller({ key: 'val' });
    expect(ctl.options).to.eql({ key: 'val' });
  });

  it('should call userland initializer', function() {

    var spy = sinon.spy();
    var Ctl = Controller.extend({
      initialize: spy
    });

    new Ctl();
    expect(spy).to.have.been.calledOnce;

  });

});
