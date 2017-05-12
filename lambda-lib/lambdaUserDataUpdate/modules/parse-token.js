/**
 * parse-token
 * Created by dcorns on 5/8/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const jwt = require('jwt-simple');
const decrypt = require('./decrypt-data');
module.exports = (token, secret) => {
  const payload = jwt.decode(token,secret,false,'HS512');
  payload.guid = decrypt(payload.guid, secret);
  return payload;
};