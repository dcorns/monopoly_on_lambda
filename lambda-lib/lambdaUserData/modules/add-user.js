/**
 * addUser
 * Created by dcorns on 5/8/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
module.exports = (userRef, copyRef) => {
  return new Promise((resolve, reject) => {
    copyRef.on('value', (copyData) => {
      console.log('ADD-USER:', copyData.val());
      userRef.set(copyData.val()).then(() => {
        resolve(true);
      });
    });
  });
};