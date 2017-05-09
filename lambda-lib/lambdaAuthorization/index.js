/**
 * index
 * Created by dcorns on 5/8/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const childProcess = require('child_process');
exports.handler = (event, context, cb) => {
  const auth = childProcess.fork('./fork-me');
  auth.send({hash: event.hash, secret: process.env.SECRET});
  auth.on('message', (m) => {
    console.log('m',m);
    if(m.err) {
      console.log(m.err);
      cb(m.err, null);
    }
    cb(null, m.token);
    auth.kill();
  });
};