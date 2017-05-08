/**
 * is-expired-hash
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
module.exports = (ref, getHashTimeStamp) => {
  return (hash, maxTtl) => {
    return new Promise((resolve, reject) => {
      getHashTimeStamp(hash).then((res) => resolve(res + maxTtl <= Date.now()));
    });
  }
};