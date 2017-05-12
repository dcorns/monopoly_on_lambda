/**
 * update-user-data
 * Created by dcorns on 5/11/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const writeConfirmed = (ref, data) => {
  return new Promise((resolve, reject) => {
    ref.on('value', (snapshot) => {
      resolve(snapshot.val() === data);
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