/**
 * fork-me.js
 * Created by dcorns on 5/5/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const parseToken = require('./modules/parse-token');
const findUserData = require('./modules/fiind-user-data');
  process.on('message', (m) => {
    getUserData(m.token, m.secret);
  });

  const getUserData = (token, secret) => {
    const userAuth = parseToken(token, secret);
    if (userAuth.exp <= Date.now()){
      process.send({err: new Error('token expired')});
    }
    else{
      findUserData(userAuth, secret).then((res) =>{
        process.send({data:res});
      }).catch((err) => {
        process.send({err:err});
      });
    }
};