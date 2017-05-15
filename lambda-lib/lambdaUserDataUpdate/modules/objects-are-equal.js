/**
 * objects-are-equal
 * Created by dcorns on 5/13/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * compare values of one object to another, return true if all values are equal
 * The objects are expected to have the same properties!
 * The property values can not be dates or functions.
 */
'use strict';
module.exports = (obj1, obj2) => {
  const obj1Values = returnObjectValuesAsArray(obj1);
  const obj2Values = returnObjectValuesAsArray(obj2);
  if(obj1Values.length !== obj2Values.length) return false;
  obj1Values.forEach((item, idx) => {
    if(item !== obj2Values[idx]) return false;
  });
  return true;
};
const returnObjectValuesAsArray = (obj) => {
  const keys = Object.keys(obj);
  let ary = [];
  keys.forEach((key)=>{
    if(typeof obj[key] === 'object') {
      let subArray = returnObjectValuesAsArray(obj[key]);
      ary = ary.concat(subArray);
    }
    else ary.push(obj[key]);
  });
  return ary;
};