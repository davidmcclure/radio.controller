

var Controller = require('../radio.controller');
var Radio = require('backbone.radio');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;


describe('Commands', function() {

  var Ctl, spy1, spy2, spy3, spy4;

  beforeEach(function() {
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    spy3 = sinon.spy();
    spy4 = sinon.spy();
  });

  it('object', function() {

    Ctl = Controller.extend({

      channel: 'chn',

      commands: {
        cmd1: 'cmd1',
        cmd2: 'cmd2'
      },

      cmd1: spy1,
      cmd2: spy2

    });

  });

  afterEach(function() {

    new Ctl();

    var chn = Radio.channel('chn');

    chn.command('cmd1', 1);
    chn.command('cmd2', 2);

    expect(spy1).to.have.been.calledWithExactly(1);
    expect(spy2).to.have.been.calledWithExactly(2);

    expect(spy1).to.have.been.calledOnce;
    expect(spy2).to.have.been.calledOnce;

  });

});
