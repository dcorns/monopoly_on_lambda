/**
 * sendAuthEmail.js
 * Created by dcorns on 4/26/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const nodeMailer = require('nodemailer');
const validationHost = 'pjpk6esqw5.execute-api.us-west-2.amazonaws.com/prod/loginrequest';
const pass = process.env.PASS;
const user = process.env.USER;
module.exports = function sendAuthEmail(email, hash){
  return new Promise((resolve, reject) => {
    if(!email) reject(new Error('Requires email input'));
    //if the email is not valid, it will simply be rejected when sent; no validation if performed, leaving that to the smtp server.
    let transporter = nodeMailer.createTransport({
      service: 'SES-US-WEST-2',
      auth: {
        user: user,
        pass: pass
      }
    });
    let opt = {
      from: 'noreply@dalecorns.com',
      to: email,
      subject: 'Monopoly Login Verification',
      text: `Hello from monopoly: Copy this into your browser address bar:
    https://${validationHost}?email=${email}&hash=${hash}`,
      html: `<h1><a href="http://monopoly-static-assets.s3-website-us-west-2.amazonaws.com/#${hash}">Click here to validate your email</a></h1>
           <h2>This was sent so that you can login to Monopoly Prize Tracker. If you did not request this login, do not click the link</h2>`
    };
    transporter.sendMail(opt, (err, res) => {
      if (err) {
        reject(new Error(err));
      }
      else {
        resolve ({email: email});
      }
    });
  });
};