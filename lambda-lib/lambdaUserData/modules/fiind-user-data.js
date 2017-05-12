/**
 * fiind-user-data
 * Created by dcorns on 5/8/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const db = require('./dbInit');
const getUserDb = require('./get-user-database');
const decrypt = require('./decrypt-data');
const addUser = require('./add-user');
let dataRef;
module.exports = (userAuth, secret) => {
  const guid = userAuth.guid;
  return new Promise((resolve, reject) => {
    dataRef = db(guid);
    getUserDb(dataRef).then((userDB) => {
      if (userDB) resolve(userDB);
      else {
        const copyRef = db('bob');
        addUser(dataRef, copyRef).then((success) => {
          if (success) {
            getUserDb(dataRef).then((userDB) => {
              resolve(userDB);
            })
          }
        });
      }
    }).catch(err => err);
  });
};