/**
 * index.js
 * Created by dcorns on 4/27/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const crypto = require('crypto');
exports.handler = function(event, context, cb) {
  const email = event.data;
  const guid = crypto.createHmac('sha256', process.env.SECRET)
    .update(email)
    .digest('hex');
  cb(null, guid);
};