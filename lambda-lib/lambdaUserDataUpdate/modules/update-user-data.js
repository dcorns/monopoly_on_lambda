/**
 * update-user-data
 * Created by dcorns on 5/11/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const objEqual = require('./objects-are-equal');
const writeConfirmed = (ref, data) => {
  return new Promise((resolve, reject) => {
    ref.on('value', (snapshot) => {
      let areEqual =objEqual(snapshot.val(), data);
      resolve(areEqual);
    })
  })
};
module.exports = (ref, data) => {
  return new Promise((resolve, reject) => {
    ref.set(data).then(() => {
      writeConfirmed(ref, data).then((result) => {
        resolve({data:result});//result = true = successful write
      });
    });
  });
};