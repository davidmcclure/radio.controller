

var Controller = require('../radio.controller');
var Radio = require('backbone.radio');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;


describe('Events', function() {

  // TODO|dev
  it('should', function() {

    var spy1 = sinon.spy();
    var spy2 = sinon.spy();
    var spy3 = sinon.spy();
    var spy4 = sinon.spy();

    var Ctl = Controller.extend({

      radio: {
        ch1: {
          events: [
            'evt1',
            'evt2'
          ]
        },
        ch2: {
          events: [
            'evt3',
            'evt4'
          ]
        }
      },

      evt1: spy1,
      evt2: spy2,
      evt3: spy3,
      evt4: spy4

    });

    new Ctl();

    var ch1 = Radio.channel('ch1');
    var ch2 = Radio.channel('ch2');
    var ch3 = Radio.channel('ch3');
    var ch4 = Radio.channel('ch4');

    ch1.trigger('evt1', 1);
    ch2.trigger('evt2', 2);
    ch3.trigger('evt3', 3);
    ch4.trigger('evt4', 4);

    expect(spy1).to.have.been.calledOnce;
    expect(spy2).to.have.been.calledOnce;
    expect(spy3).to.have.been.calledOnce;
    expect(spy4).to.have.been.calledOnce;

    expect(spy1).to.have.been.calledWithExactly(1);
    expect(spy2).to.have.been.calledWithExactly(2);
    expect(spy3).to.have.been.calledWithExactly(3);
    expect(spy4).to.have.been.calledWithExactly(4);

  });

});
