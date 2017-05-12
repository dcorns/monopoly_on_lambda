/**
 * index
 * Created by dcorns on 5/11/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const childProcess = require('child_process');
const secret = process.env.SECRET;
exports.handler = (event, context, cb) => {
  const token = event.headers["Authorization"];
  const forkMe = childProcess.fork('./fork-me');
  forkMe.send({token: token, secret: secret, data: event.data});
  forkMe.on('message', (m) => {
    if(m) cb(null, m);//m equals true for successful write
    if(m.err) cb(m.err, null);//err= 1 indicates an expired token
    forkMe.kill();
  });
};
