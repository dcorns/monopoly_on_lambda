/**
 * clean-hash-table
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
module.exports = (ref, getAllHashes, reconcileHash) => {
  return (maxTtl) => {
    return new Promise((resolve, reject) => {
      getAllHashes().then((res) => {
        if(!res) resolve(0);
        const pNames = Object.keys(res);
        let deleteCount = 0;
        pNames.forEach((pName, idx, ary) => {
          reconcileHash(pName, maxTtl).then((res) => {
            deleteCount++;
            if(idx === ary.length - 1) resolve(deleteCount);
          });
        });
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }
};