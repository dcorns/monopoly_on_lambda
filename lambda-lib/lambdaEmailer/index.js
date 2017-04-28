/**
 * index.js
 * Created by dcorns on 4/26/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const nodeMailer = require('nodemailer');
exports.handler = function(event, context, callback) {
  let email = (event.email === undefined ? false : event.email);
  if(!email) callback(new Error('Requires email input'));
  //if the email is not valid, it will simply be rejected when sent; no validation if performed, leaving that to the smtp server.
  let transporter = nodeMailer.createTransport({
    service: 'SES-US-WEST-2',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });
  let opt = {
    from: 'noreply@dalecorns.com',
    to: email,
    subject: 'Monopoly Login Verification',
    text: 'Hello from monopoly',
    html: `<h1><a href="http://www.dalecorns.com">Click here to validate your email</a></h1>
           <h2>This was sent so that you can login to Monopoly Prize Tracker. If you did not request this login, do not click the link</h2>`
  };
  transporter.sendMail(opt, (err, res) => {
    if (err) {
      callback(err);
    }
    else {
      callback(null, {"Message sent to": email});
    }
  });
};