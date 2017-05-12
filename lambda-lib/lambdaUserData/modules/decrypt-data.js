/**
 * extract-email
 * Created by dcorns on 5/6/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const crypto = require('crypto');
module.exports = (hash, secret) => {
  const extract = crypto.createDecipher('aes-256-cbc-hmac-sha256', secret);
  let data = extract.update(hash, 'hex', 'utf8');
  data += extract.final('utf8');
  return data;
};
