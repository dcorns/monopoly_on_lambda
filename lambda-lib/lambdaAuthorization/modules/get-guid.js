/**
 * get-guid
 * Created by dcorns on 5/7/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const crypto = require('crypto');
module.exports = (email, secret) => {
  return crypto.createHmac('sha256', secret)
    .update(email)
    .digest('hex');
};