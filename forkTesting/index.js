/**
 * test
 * Created by dcorns on 5/8/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const childProcess = require('child_process');
exports.handler = (event, context, cb) => {
  const email = event.email;
  let crypt;
  console.log(email);
  const cp = childProcess.fork('./test-in');
  cp.send({data: email, secret: 'thisisAs3cr3t'});
  cp.on('message', (m) => {
    console.log(m);
    if(m.err) console.log(m.err);
    crypt = m.crypt;
    console.log('crypt:', crypt);
    cb(null, {"crypt": crypt});
    cp.kill();
  });
};

