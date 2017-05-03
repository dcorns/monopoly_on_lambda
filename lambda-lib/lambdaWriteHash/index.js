/**
 * index
 * Created by dcorns on 4/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
exports.handler = (event, context, cb) => {
  const hash = event.hash;
  if (admin.apps.length === 0) { // <---Important!!! In lambda, it will cause double initialization and the API Gateway will need to execute twice for a successful result.
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.DB
    });
  }
  let db = admin.database();
  let ref = db.ref();
  ref.child(hash).set(hash)
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      process.exit([0]);//db.goOffline() does not work. This does, even though lambda will call proccess ended early error, at least it won't sit there until it times out now.
    });
};