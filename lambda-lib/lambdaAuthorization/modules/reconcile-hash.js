/**
 * reconcile-hash
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
module.exports = (ref, isExpiredHash, removeHash) => {
  return (hash, maxTtl) => {
    return new Promise((resolve, reject) => {
      isExpiredHash(hash, maxTtl).then((res) => {
        if(res) removeHash(hash).then((res) => {resolve(res)});
        else resolve(res);
      });
    });
  }
};