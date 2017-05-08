/**
 * get-hash-time-stamp
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
module.exports = (ref) => {
  return (hash) => {
    return new Promise((resolve, reject) => {
      ref.child(hash).on('value', ss => resolve(ss.val()));
    });
  }
};