/**
 * check-for-one-zero
 * Created by dcorns on 5/17/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * If only one item(quantity) in the given array equal 0, return the preceding index value(label) unless the first item in the array is the only item equal to zero in that case it will return '', If no items in the array are uniquely 0 it returns '';
 */
'use strict';
module.exports = (ary) => {
  const zeroValueIndexes = [];
  ary.forEach((cur, idx) => {
    if(cur === 0) zeroValueIndexes.push(idx);
  });
  if(zeroValueIndexes.length < 1) return '';
  if(zeroValueIndexes[0] < 1) return '';
  if(zeroValueIndexes.length === 1) return ary[zeroValueIndexes[0] - 1];
  return '';
};