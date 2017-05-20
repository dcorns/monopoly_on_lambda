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
  forkMe.send({token: token, secret: secret, data: event.body});
  forkMe.on('message', (m) => {
    console.log('m:',m);
    console.log('m.err',m.err);
    if(m.err){
      if(m.err === 1) cb("Token Expired")
    }
    if(m) cb(null, m);//m equals true for successful write
    forkMe.kill();
  });
};