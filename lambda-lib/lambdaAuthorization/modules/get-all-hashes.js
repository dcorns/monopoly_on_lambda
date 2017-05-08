/**
 * get-all-hashes
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
module.exports = (ref) => {
  return () => {
    return new Promise((resolve, reject) => {
      ref.on('value', (snapShot) => {
        resolve(snapShot.val());
      });
    });
  }
};