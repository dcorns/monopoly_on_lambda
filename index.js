/**
 * index.js
 * Created by dcorns on 4/20/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
//const corngoose = require('corngoose');
const app = express();
app.use(bodyParser.json());
//const port = process.env.PORT || 3000;
//corngoose.startDB('monopoly');
app.use(express.static(__dirname + '/public'));

// app.get('/allPrizeData', function(req, res){
//   corngoose.getCollection('prizes', function(err, data){
//     if (err){
//       return null;
//     }
//     res.status(200);
//     res.contentType = 'json';
//     res.send(data);
//   });
// });
//
// app.post('/updatePrize', function(req, res){
//   corngoose.dbDocUpdate({name: req.body.name, value: req.body.value},req.body,'prizes',function(err, data){
//     if (err){
//       res.status(400);
//       res.contentType = 'json';
//       res.send(err);
//       return null;
//     }
//     res.status(200);
//     res.contentType = 'json';
//     res.send(data);
//   });
// });

// const server = app.listen(port, 'localhost', function(){
//   console.log('Server listening on port ' + port);
// });

module.exports = app;