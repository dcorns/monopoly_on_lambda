/**
 * index-test
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const getHash = require('./gethash');
const db = require('./dbinit-test')('hash');
const writeHash = require('./write-hash')(db);
const sendAuthEmail = require('./sendAuthEmail-test');

const email = 'drcorns@hotmail.com';
const issuedTime = Date.now();
const hash = getHash(email, 'AKIAJAFWSJKQFG755Q5A1963' + issuedTime);
writeHash(hash, issuedTime).then((res) => {
  console.log(hash);
  sendAuthEmail(email, hash).then((res) => {
    process.exit(); //Because firebase will keep the process open!!!
  })
    .catch((err) => err);
})
  .catch((err) => {
    return err;
    //maybe send problem email
  });
return {"Message sent to": "return object"};