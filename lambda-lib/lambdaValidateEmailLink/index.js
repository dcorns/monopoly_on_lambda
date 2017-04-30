/**
 * index
 * Created by dcorns on 4/29/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const https = require('https');
const opt = {
  host: process.env.URLHOST,
  port: '443',
  path: process.env.URLPATH,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};
//Note leave this comment here as a reminder that while lambda is not here to save state. If it is recalled fast enough it will
//Leaving the declaration outside the handler will allow it to maintain a closure which means each call to the function will still have the previous result stored in result
//Result can not be guaranteed to be reassigned unless it is assigned inside the handler
//let result = '';

exports.handler = function(event, context, cb) {
  let result = '';
  const email = event.email;
  const hash = JSON.stringify(event.hash);
  const req = https.request(opt, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      console.log(hash);
      console.log(result);
      cb(null, hash === result);
    });
  });
  req.write(JSON.stringify({"email": email}));
  req.end();
};