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
app.post('/updatePrize', function(req, res){
  res.json({'called':'updatePrize'});
});

module.exports = app;