/**
 * index
 * Created by dcorns on 4/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const crypto = require('crypto');
exports.handler = (event, context, cb) => {
  const email = event.email;
  const secret =crypto.randomBytes(20).toString('base64');
  const hash = crypto.createHmac('sha256', secret)
    .update(email)
    .digest('hex');
  cb(null, hash);
};
const secret =crypto.randomBytes(20).toString('base64');