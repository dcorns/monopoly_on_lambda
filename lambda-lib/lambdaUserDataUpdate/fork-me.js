/**
 * fork-me
 * Created by dcorns on 5/11/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const parseToken = require('./modules/parse-token');
const db = require('./modules/dbInit');
const upDateData = require('./modules/update-user-data');
process.on('message', (m) => {
  startUpdate(m.token, m.secret, m.data);
});

const startUpdate = (token, secret, data) => {
  const prizeIdx = data.prizeIdx.toString();
  const prize = data.prize;
  const userAuth = parseToken(token, secret);
  if (userAuth.exp <= Date.now()){
    process.send({err: 1});//Expired token(err = 1)
  }
  else{
    const dataRef = db(`${userAuth.guid}/${prizeIdx}`);
    upDateData(dataRef, prize).then((res) => {
      if(res.err) process.send(res.err);
      process.send(res.data);
    });
  }
};