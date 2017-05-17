/**
 * check-for-one-zero.spec
 * Created by dcorns on 5/17/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const expect = require('chai').expect;
const checkForOneZero = require('../modules/check-for-one-zero');
describe('checkForOneZero', () => {
  const test = ['a', 3, 'b', 0, 'c', 48, 'd', 9];
  it('returns the previous element value of an element having a value that is uniquely 0', () => {
    expect(checkForOneZero(test)).to.equal('b');
  });
  const test2 = ['a', 3, 'b', 0, 'c', 0, 'd', 9];
  it('returns "" if more than one element is equal to zero', () => {
    expect(checkForOneZero(test2)).to.equal('');
  });
  const test3 = [0, 3, 'b', 3, 'c', 8, 'd', 9];
  it('returns "" if the first element is uniquely equal to zero', () => {
    expect(checkForOneZero(test3)).to.equal('');
  });
});