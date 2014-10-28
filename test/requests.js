

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

      channel: 'chn',

      requests: {
        req1: 'req1',
        req2: 'req2'
      },

      req1: spy1,
      req2: spy2

    });

  });

  afterEach(function() {

    new Ctl();

    var chn = Radio.channel('chn');

    var resp1 = chn.request('req1', 1);
    var resp2 = chn.request('req2', 2);

    expect(resp1).to.equal(1);
    expect(resp2).to.equal(2);

    expect(spy1).to.have.been.calledWithExactly(1);
    expect(spy2).to.have.been.calledWithExactly(2);

    expect(spy1).to.have.been.calledOnce;
    expect(spy2).to.have.been.calledOnce;

  });

});
