

var Controller = require('../radio.controller');
var Radio = require('backbone.radio');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;


describe('Events', function() {

  var Ctl, spy1, spy2, spy3, spy4;

  beforeEach(function() {
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    spy3 = sinon.spy();
    spy4 = sinon.spy();
  });

  it('object', function() {

    Ctl = Controller.extend({

      events: {
        ch1: {
          evt1: 'evt1',
          evt2: 'evt2'
        },
        ch2: {
          evt3: 'evt3',
          evt4: 'evt4'
        }
      },

      evt1: spy1,
      evt2: spy2,
      evt3: spy3,
      evt4: spy4

    });

  });

  afterEach(function() {

    new Ctl();

    var ch1 = Radio.channel('ch1');
    var ch2 = Radio.channel('ch2');

    ch1.trigger('evt1', 1);
    ch1.trigger('evt2', 2);
    ch2.trigger('evt3', 3);
    ch2.trigger('evt4', 4);

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
