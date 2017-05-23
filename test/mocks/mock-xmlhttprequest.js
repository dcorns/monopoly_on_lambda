/**
 * mock-xmlhttprequest
 * Created by dcorns on 5/22/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const mockXMLHttpRequest = {
  add: (context) => {
    if (!(context.XMLHttpRequest)) {
      context.XMLHttpRequest = function () {
        this.addEventListener = (eventName, cb) => {
          XMLHttpRequest.mockResults.eventListeners.push({eventName: eventName, cb: cb});
        };
        this.open = (type, url, isAsync) => {
          XMLHttpRequest.mockResults.open.called = true;
          XMLHttpRequest.mockResults.open.type = type;
          XMLHttpRequest.mockResults.open.url = url;
          XMLHttpRequest.mockResults.open.isAsync = isAsync;
        };
        this.setRequestHeader = (key, value) => {
          XMLHttpRequest.mockResults.requestHeaders.push({key: key, value: value});
        };
        this.send = (data) => {
          XMLHttpRequest.mockResults.sendCalled = true;
          XMLHttpRequest.mockResults.sendData = data;
        };
        context.XMLHttpRequest.mockResults =
          {
            created: true,
            eventListeners: [],
            open: {
              called: false,
              type: '',
              url: '',
              isAsync: false,
            },
            requestHeaders: [],
            sendData: '',
            sendCalled: false,
          };
      };
    }
    else {
      throw new ReferenceError(`XMLHttpRequest already exist on ${context} object`);
    }
  },
  remove: (context) => {
    if (context.XMLHttpRequest) delete context.XMLHttpRequest;
    else return false;
    return true;
  }
};
module.exports = mockXMLHttpRequest;
