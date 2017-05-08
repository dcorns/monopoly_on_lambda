/**
 * index
 * Created by dcorns on 5/1/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const getHash = require('./gethash');
const db = require('./dbInit')('hash');
const writeHash = require('./write-hash')(db);
const sendAuthEmail = require('./sendAuthEmail');
const admin = require('firebase-admin');//had to add here for it to work in writeHash module on lambda
exports.handler = (event, context, cb) => {
  const email = event.email;
  const issuedTime = Date.now();
  const hash = getHash(email, process.env.SECRET + issuedTime);
  writeHash(hash, issuedTime).then((res) => {
    console.log(res);
    sendAuthEmail(email, hash).then((res) => {
      console.log(res);
      process.exit(); //Because firebase will keep the process open!!!
    })
      .catch((err) => cb(err));
  })
    .catch((err) => {
      cb(err);
      //maybe send problem email
    });
};