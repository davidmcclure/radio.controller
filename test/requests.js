

var Controller = require('../radio.controller');
var Radio = require('backbone.radio');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;


describe('Requests', function() {

  var Ctl, spy1, spy2, spy3, spy4;

  beforeEach(function() {
    spy1 = sinon.stub().returns(1);
    spy2 = sinon.stub().returns(2);
    spy3 = sinon.stub().returns(3);
    spy4 = sinon.stub().returns(4);
  });

  it('array of strings', function() {

    Ctl = Controller.extend({

      radio: {
        ch1: {
          requests: {
            req1: 'req1',
            req2: 'req2'
          }
        },
        ch2: {
          requests: {
            req3: 'req3',
            req4: 'req4'
          }
        }
      },

      req1: spy1,
      req2: spy2,
      req3: spy3,
      req4: spy4

    });

  });

  afterEach(function() {

    new Ctl();

    var ch1 = Radio.channel('ch1');
    var ch2 = Radio.channel('ch2');

    var resp1 = ch1.request('req1', 1);
    var resp2 = ch1.request('req2', 2);
    var resp3 = ch2.request('req3', 3);
    var resp4 = ch2.request('req4', 4);

    expect(resp1).to.equal(1);
    expect(resp2).to.equal(2);
    expect(resp3).to.equal(3);
    expect(resp4).to.equal(4);

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
