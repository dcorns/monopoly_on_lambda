/**
 * ajax-post-json.spec
 * Created by dcorns on 5/20/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const expect = require('chai').expect;
const ajaxPostJson = require('../../modules/ajax-post-json');
const mockXMLHttpRequest = require('../mocks/mock-xmlhttprequest');
describe('ajax-post-json', () => {
  before(() => {
    mockXMLHttpRequest.add(global);
  });
  after(() => {
    mockXMLHttpRequest.remove(global);
  });
  it('Requires the first and third arguments (url,cb) and null for second argument if no json data is provided', () => {
    expect(() => {
      ajaxPostJson()
    }).to.throw(Error, 'url and cb arguments required, make sure the second argument is null if not passing in data');
    expect(() => {
      ajaxPostJson('url', () => {
      })
    }).to.throw(Error, 'url and cb arguments required, make sure the second argument is null if not passing in data');
  });
  it('Requires jsonData to be an object or null object', () => {
    expect(() => {
      ajaxPostJson('http', 'string', () => {
      })
    }).to.throw(Error, 'second argument (jsonData) must be json object or null');
    expect(() => {
      ajaxPostJson('http', 12, () => {
      })
    }).to.throw(Error, 'second argument (jsonData) must be json object or null');
  });
  it('requires the third argument to be a function', () => {
    expect(() => {
      ajaxPostJson('url', null, {})
    }).to.throw(Error, 'third argument must be a callback function');
  });
  it('creates an instance of the XMLHttpRequest object', () => {
    ajaxPostJson('url', null, () => {
    });
    expect(global.XMLHttpRequest.mockResults.created).to.be.true;
  });
  it('creates a load event listener on the XMLHttpRequest instance', () => {
    ajaxPostJson('url', null, () => {});
    expect(XMLHttpRequest.mockResults.eventListeners[0].eventName === 'load').to.be.true;
  });
  it('creates an error event listener on the XMLHttpRequest instance', () => {
    ajaxPostJson('url', null, () => {});
    expect(XMLHttpRequest.mockResults.eventListeners[1].eventName === 'error').to.be.true;
  });
  it('calls open with POST asynchronously on the XMLHttpRequest instance for the provided url',() => {
    ajaxPostJson('http://myweb.com', null, () => {});
    expect(XMLHttpRequest.mockResults.open.called).to.be.true;
    expect(XMLHttpRequest.mockResults.open.isAsync).to.be.true;
    expect(XMLHttpRequest.mockResults.open.type === 'POST').to.be.true;
    expect(XMLHttpRequest.mockResults.open.url === 'http://myweb.com').to.be.true;
  });
  it('runs JSON.stringify on data and calls send on the XMLHttpRequest instance with result',() => {
    ajaxPostJson('http://myweb.com', {color: 'red'}, () => {});
    expect(XMLHttpRequest.mockResults.sendCalled).to.be.true;
    expect(JSON.parse(XMLHttpRequest.mockResults.sendData).color === 'red').to.be.true;
  });
  it('calls send on the XMLHttpRequest instance without data if no data is provided',() => {
    ajaxPostJson('http://myweb.com', null, () => {});
    expect(XMLHttpRequest.mockResults.sendCalled).to.be.true;
    expect(XMLHttpRequest.mockResults.sendData).to.be.undefined;
  });
  it('creates a Content-Type header of application/json;charset=UTF-8 on the XMLHttpRequest instance',() => {
    ajaxPostJson('http://myweb.com', null, () => {});
    expect(XMLHttpRequest.mockResults.requestHeaders[0].key).equal('Content-Type');
    expect(XMLHttpRequest.mockResults.requestHeaders[0].value).equal('application/json;charset=UTF-8');
  });
  it('creates an Authorization header on the XMLHttpRequest instance if token is provided',() => {
    ajaxPostJson('http://myweb.com', null, () => {}, 'my token without bearer');
    expect(XMLHttpRequest.mockResults.requestHeaders[1].key).equal('Authorization');
    expect(XMLHttpRequest.mockResults.requestHeaders[1].value).equal('my token without bearer');
  });
  it('does not create an Authorization header on the XMLHttpRequest instance if token is undefined',() => {
    ajaxPostJson('http://myweb.com', null, () => {});
    expect(XMLHttpRequest.mockResults.requestHeaders[1]).to.be.undefined;
    expect(XMLHttpRequest.mockResults.requestHeaders[1]).to.be.undefined;
  });




});