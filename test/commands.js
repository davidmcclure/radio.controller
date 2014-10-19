

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

  it('array of strings', function() {

    Ctl = Controller.extend({

      radio: {
        ch1: {
          commands: [
            'cmd1',
            'cmd2'
          ]
        },
        ch2: {
          commands: [
            'cmd3',
            'cmd4'
          ]
        }
      },

      cmd1: spy1,
      cmd2: spy2,
      cmd3: spy3,
      cmd4: spy4

    });

  });

  it('mixed array of strings and objects', function() {

    Ctl = Controller.extend({

      radio: {
        ch1: {
          commands: [
            'cmd1',
            { cmd2: 'cmd2a'}
          ]
        },
        ch2: {
          commands: [
            'cmd3',
            { cmd4: 'cmd4a'}
          ]
        }
      },

      cmd1:   spy1,
      cmd2a:  spy2,
      cmd3:   spy3,
      cmd4a:  spy4

    });

  });

  afterEach(function() {

    new Ctl();

    var ch1 = Radio.channel('ch1');
    var ch2 = Radio.channel('ch2');

    ch1.command('cmd1', 1);
    ch1.command('cmd2', 2);
    ch2.command('cmd3', 3);
    ch2.command('cmd4', 4);

    expect(spy1).to.have.been.calledWithExactly(1);
    expect(spy2).to.have.been.calledWithExactly(2);
    expect(spy3).to.have.been.calledWithExactly(3);
    expect(spy4).to.have.been.calledWithExactly(4);

    expect(spy1).to.have.been.calledOnce;
    expect(spy2).to.have.been.calledOnce;
    expect(spy3).to.have.been.calledOnce;
    expect(spy4).to.have.been.calledOnce;

  });

});
