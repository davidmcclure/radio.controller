

var Controller = require('../radio.controller');
var Radio = require('backbone.radio');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;


describe('Commands', function() {

  var spy1, spy2;

  beforeEach(function() {
    spy1 = sinon.spy();
    spy2 = sinon.spy();
  });

  it('should bind commands to callbacks', function() {

    var Ctl = Controller.extend({

      channel: 'ch1',

      commands: {
        cmd1: 'cmd1',
        cmd2: 'cmd2'
      },

      cmd1: spy1,
      cmd2: spy2

    });

    new Ctl();

    var ch1 = Radio.channel('ch1');

    ch1.command('cmd1', 1);
    ch1.command('cmd2', 2);

    expect(spy1).to.have.been.calledWithExactly(1);
    expect(spy2).to.have.been.calledWithExactly(2);
    expect(spy1).to.have.been.calledOnce;
    expect(spy2).to.have.been.calledOnce;

  });

});
