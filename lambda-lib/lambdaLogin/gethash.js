/**
 * gethash
 * Created by dcorns on 4/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const crypto = require('crypto');
module.exports = function getHash(email){
  const secret =crypto.randomBytes(20).toString('base64');
  const hash = crypto.createHmac('sha256', secret)
    .update(email)
    .digest('hex');
  return hash;
};