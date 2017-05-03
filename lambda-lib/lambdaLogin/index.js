/**
 * index
 * Created by dcorns on 5/1/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const getHash = require('./gethash');
const writeHash = require('./writeHash');
const sendAuthEmail = require('./sendAuthEmail');
exports.handler = (event, context, cb) => {
  const email = event.email;
  const hash = getHash(email);
  writeHash(hash).then((res) => {
    console.log(res);
    sendAuthEmail(email, hash).then((res) => {
      cb(null, res);
      process.exit(); //Because firebase will keep the process open!!!
    })
      .catch((err) => cb(err));
  })
    .catch((err) => {
      cb(err);
      //maybe send problem email
    });
  cb(null, {"Message sent to": "return object"});
};
// const makeOpt = (path) => {
//   return {
//     host: urlHost,
//     port: '443',
//     path: urlStage + path,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   };
// };

// const request = (opt, jsonIn) => {
//   return new Promise((resolve, reject) => {
//     let result = '';
//     const req = https.request(opt, (res) => {
//       res.setEncoding('utf8');
//       res.on('data', (chunk) => {
//         result += chunk;
//       });
//       res.on('end', () => {
//         resolve(result);
//       });
//     });
//     req.write(JSON.stringify(jsonIn));
//     req.end();
//   });
// };

// const getHash = () => {
//   return request(makeOpt(hashPath), {email: email});
// };
// const writeHash = (hash) => {
//   emailHash = hash;
//   return request(makeOpt(writeHashPath),{hash:hash});
// };
// const sendEmail = () => {
//   return request(makeOpt(sendEmailAuthPath), {hash:emailHash, email: email});
// };
//Verify login
// const doit = () => {
//   return getHash().then(writeHash).then(sendEmail).catch((err) => {console.log(err)});
// };
// doit().then(console.log('Verification Complete'));