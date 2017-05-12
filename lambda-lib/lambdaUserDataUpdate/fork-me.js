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
const createPartQuantityPath = require('./modules/create-part-quantity-path');
process.on('message', (m) => {
  startUpdate(m.token, m.secret, m.data);
});

const startUpdate = (token, secret, data) => {
  const prizeIdx = data.prizeIdx.toString();
  const partQuantityIdx = data.partQuantityIdx.toString();
  const setValue = parseInt(data.setValue,10);//put in try block later
  const userAuth = parseToken(token, secret);
  if (userAuth.exp <= Date.now()){
    process.send({err: 1});//Expired token(err = 1)
  }
  else{
    const dataRef = db(createPartQuantityPath(userAuth.guid, prizeIdx, partQuantityIdx));
    upDateData(dataRef, setValue).then((res) => {
      if(res.err) process.send(res.err);
      process.send(res.data);
    });
  }
};