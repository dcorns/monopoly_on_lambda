/**
 * index.js
 * Created by dcorns on 4/20/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const nodeMailer = require('nodemailer');
const emailUser = process.env.EMAILUSER;
const emailPass = process.env.EMAILPASS;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/allPrizeData', function(req, res){
  console.log('allPrizesCalled');
  https.get('https://monopoly-d9e3c.firebaseio.com/dcorns.json', (fbres) => {
    console.log('inside https.get');
    fbres.on('data', (d) => {
      console.log('inside fbres');
      res.json(d.toString());
    }).
    on('error', (e) => {
      res.status(404);
      res.json(e);
    });
  });
});
app.post('/requestToken', (req, res) => {
  let transporter = nodeMailer.createTransport({
    service: 'SES-US-WEST-2',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
  let opt = {
    from: 'noreply@dalecorns.com',
    to: req.body.email,
    subject: 'Monopoly Login Verification',
    text: 'Hello from monopoly',
    html: `<h1><a href="http://www.dalecorns.com">Click here to validate your email</a></h1>
           <h2>This was sent so that you can login to Monopoly Prize Tracker. If you did not request this login, do not click the link</h2>`
  };
  transporter.sendMail(opt, (err, res) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`Message sent: ${res.message}`);
    }
  });
});
app.post('/updatePrize', function(req, res){
  res.json({'called':'updatePrize'});
});

module.exports = app;