/**
 * index.js
 * Created by dcorns on 5/5/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const db = require('./modules/dbInit')('hash');
const getAllHashes = require('./modules/get-all-hashes')(db);
const getHashTimeStamp = require('./modules/get-hash-time-stamp')(db);
const isExpiredHash = require('./modules/is-expired-hash')(db, getHashTimeStamp);
const removeHash = require('./modules/remove-hash')(db);
const reconcileHash = require('./modules/reconcile-hash')(db, isExpiredHash, removeHash);
const cleanHashTable = require('./modules/clean-hash-table')(db, getAllHashes, reconcileHash);
const extractEmail = require('./modules/extract-email');
const getGUID = require('./modules/get-guid');
const encryptData = require('./modules/encrypt-data');
const issueToken = require('./modules/issue-token');
const hashLife = 5 * 60000; //60000 = 1min

exports.handler = (event, context, cb) => {
  const hash = event.hash;
  const secret = process.env.SECRET;
  const makeToken = (hash, timestamp) => {
    const email = extractEmail(hash, secret + timestamp);
    const guid = getGUID(email, secret);
    const encryptedGuid = encryptData(guid, secret);
    const token = issueToken(secret, encryptedGuid, 1);
    cb(null, token);
  };

  cleanHashTable(hashLife).then(() => {
    getHashTimeStamp(hash).then((timeStamp) => {
      if(!timeStamp) cb(new Error('invalid time stamp'), null);
      makeToken(hash, timeStamp);
      removeHash(hash).then((res) => {
        console.log('hashRemoved:', res);
      });
    });
  }).catch((err) => {
    cb(err, null);
  });
};