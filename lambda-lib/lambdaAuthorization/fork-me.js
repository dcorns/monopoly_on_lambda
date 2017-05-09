/**
 * fork-me.js
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

  process.on('message', (m) => {
    console.log('m:', m);
    authorize(m.hash, m.secret);
  });
  const makeToken = (hash, timestamp, secret) => {
    const email = extractEmail(hash, secret + timestamp);
    const guid = getGUID(email, secret);
    const encryptedGuid = encryptData(guid, secret);
    const token = issueToken(secret, encryptedGuid, 1);
    process.send({err: null, token: token});
  };

  const authorize = (hash, secret) => {
    console.log('authorize:',hash,secret);
    cleanHashTable(hashLife).then(() => {
      getHashTimeStamp(hash).then((timeStamp) => {
        if(!timeStamp) process.send({err:new Error('invalid time stamp'), token: null});
        makeToken(hash, timeStamp, secret);
        removeHash(hash).then((res) => {
          console.log('hashRemoved:', res);
        });
      });
    }).catch((err) => {
      process.send({err: err, token: null});
    });
  };