/**
 * dbInit
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * Passes the reference to a firebase collection
 * MIT Licensed
 */
'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
if(admin.apps.length === 0){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB
  });
}
module.exports = (collection) => {
  return admin.database().ref().child(collection);
};