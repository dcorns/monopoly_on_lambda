/**
 * writeHash
 * Created by dcorns on 4/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
module.exports = function writeHash(hash){
  return new Promise((resolve, reject) =>{
    if (admin.apps.length === 0) { // <---Important!!! In lambda, it will cause double initialization and the API Gateway will need to execute twice for a successful result.
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.DB
      });
    }
    const db = admin.database();
    const ref = db.ref();
    ref.child('hash').child(hash).set(Date.now())
      .catch((err) => {
        console.log(err);
        reject(err);
      }).then((res) => {
      resolve(true);
    });
  });
  //Need to find a way to confirm the write succeeded.
};