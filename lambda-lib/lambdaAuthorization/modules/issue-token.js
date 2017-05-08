/**
 * issueToken
 * Created by dcorns on 5/7/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const jwt = require('jwt-simple');
module.exports = (secret, guid, expHours) => {
  const hoursToMs = hrs => hrs * 60 * 60000;
  const payload = {
    "iss": "prizeTracker",
    "exp": hoursToMs(expHours) + Date.now(),
    "iat": Date.now(),
    "guid": guid
  };
  return jwt.encode(payload, secret, 'HS512');
};