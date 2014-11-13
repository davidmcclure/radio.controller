

var Controller = require('../radio.controller');
var Radio = require('backbone.radio');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;


describe('Requests', function() {

  var spy1, spy2;

  beforeEach(function() {
    spy1 = sinon.stub().returns(10);
    spy2 = sinon.stub().returns(20);
  });

  it('should bind requests to callbacks', function() {

    var Ctl = Controller.extend({

      channel: 'ch1',

      requests: {
        req1: 'req1',
        req2: 'req2'
      },

      req1: spy1,
      req2: spy2

    });

    new Ctl();

    var ch1 = Radio.channel('ch1');
    var rp1 = ch1.request('req1', 1);
    var rp2 = ch1.request('req2', 2);

    expect(rp1).to.equal(10);
    expect(rp2).to.equal(20);
    expect(spy1).to.have.been.calledWithExactly(1);
    expect(spy2).to.have.been.calledWithExactly(2);
    expect(spy1).to.have.been.calledOnce;
    expect(spy2).to.have.been.calledOnce;

  });

});
