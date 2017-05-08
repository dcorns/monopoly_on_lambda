/**
 * write-hash
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
module.exports = (ref) => {
  return (hash) => {
    return new Promise((resolve, reject) => {
      ref.child(hash).set(Date.now()).then(() => {
        resolve(true);
      });
    });
  };
};