/**
 * index.js
 * Created by dcorns on 4/27/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */

exports.handler = function(event, context, callback) {
  const https = require('https');
  let uid = event.uid || 'bob';
  https.get(`${process.env.DB}/${uid}.json`, (fbres) => {
    console.log('inside https.get');
    fbres.on('data', (d) => {
      callback(null, d.toString());
    }).
    on('error', (e) => {
      callback(e);
    });
  });
};