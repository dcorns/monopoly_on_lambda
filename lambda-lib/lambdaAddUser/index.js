/**
 * index
 * Created by dcorns on 4/29/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const https = require('https');
const opt = {
  host: 'pjpk6esqw5.execute-api.us-west-2.amazonaws.com',
  port: '443',
  path: '/prod/validateemaillink',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};
let result = '';
const email = 'codefellow@gmail.com';
const hash = "ae8ee9ee9f9e537fdeb18092e2b436660f12502876c692fd87c7885f85025d03";
const req = https.request(opt, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    result += chunk;
  });
  res.on('end', () => {
    if(result) {
      //use the user hash for token
    }
  });
});
req.write(JSON.stringify({"email": email, "hash": hash}));
req.end();