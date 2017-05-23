/**
 * ajax-post-json
 * Created by dcorns on 5/20/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Handles post requests with optional jsonData and optional JWT authorization token
 */
'use strict';
module.exports = (url, jsonData, cb, token) => {
  if(!url || !cb) throw new Error('url and cb arguments required, make sure the second argument is null if not passing in data');
  if(typeof jsonData !== 'object') throw new Error('second argument (jsonData) must be json object or null');
  if(typeof cb !== 'function') throw new Error('third argument must be a callback function');
  const ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', () => {
    if (ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.responseText), null);
  });
  ajaxReq.addEventListener('error', (err) => {
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information',
      error: err}, null);
  });
//Must open before setting request header, so this order is required
  ajaxReq.open('POST', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  if (token) {
    ajaxReq.setRequestHeader('Authorization', token);
  }
  if(jsonData) {
    ajaxReq.send(JSON.stringify(jsonData));
  }
  else{
    ajaxReq.send();
  }
};
