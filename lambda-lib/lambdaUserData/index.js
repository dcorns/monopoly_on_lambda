/**
 * index
 * Created by dcorns on 5/8/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const childProcess = require('child_process');
const secret = process.env.SECRET;
exports.handler = (event, context, cb) => {
  const token = event.headers["Authorization"];
  const userData = childProcess.fork('./fork-me');
  userData.send({token: token, secret: secret});
  userData.on('message', (m) => {
    if(m.data) cb(null, m.data);
    if(m.err) {
      console.error(m.err);
      cb("Token Expired");
    }
    userData.kill();
  });
};