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
const prizeData = [{"_id":{"$oid":"56d0da05a1f6053f7b7f5a75"},"name":"Cash $5.00","value":5.0,"available":800000.0,"tickets":{"required":4,"partList":["9J36A",7,"9J37B",0,"9J38C",12,"9J39D",7,null,null,null,null,null,null,null,null,null],"winner":"9J37B"},"startAvailable":800000.0,"viewId":"p7"},
{"_id":{"$oid":"56d0daaea1f6053f7b7f5a76"},"name":"Cash $10.00","value":10,"available":37500,"tickets":{"required":4,"partList":["9G28A",14,"9G29B",8,"9G30C",14,"9G31D",0,null,null,null,null,null,null,null,null,null],"winner":"9G31D"},"viewId":"p6"},
{"_id":{"$oid":"56d0db34a1f6053f7b7f5a77"},"name":"Cash $25.00","value":25.0,"available":10000.0,"tickets":{"required":4,"partList":["9C12A",7,"9C13B",10,"9C14C",10,"9C15D",0,null,null,null,null,null,null,null,null,null],"winner":"9C15D"},"viewId":"p5"},
{"_id":{"$oid":"56d0dbb7a1f6053f7b7f5a78"},"name":"$15 Grocery Gift Card","value":15.0,"available":25000.0,"tickets":{"required":4,"partList":["9E20A",14,"9E21B",8,"9E22C",0,"9E23D",17,null,null,null,null,null,null,null,null,null],"winner":"K549C"},"viewId":"p4"},
{"_id":{"$oid":"56d0dc55a1f6053f7b7f5a79"},"name":"$10 Grocery Gift Card","value":10.0,"available":37500.0,"tickets":{"required":4,"partList":["9F24A",8,"9F25B",6,"9F26C",0,"9F27D",10,null,null,null,null,null,null,null,null,null],"winner":"9F26C"},"startAvailable":37500.0,"viewId":"p19"},
{"_id":{"$oid":"56d0dcc2a1f6053f7b7f5a7a"},"name":"$5 Grocery Gift Card","value":5.0,"available":800000.0,"tickets":{"required":4,"partList":["9H32A",0,"9H33B",8,"9H34C",6,"9H35D",7,null,null,null,null,null,null,null,null,null],"winner":"9H32A"},"startAvailable":800000.0,"viewId":"p18"},
{"_id":{"$oid":"56d0dd92a1f6053f7b7f5a7b"},"name":"Grill \u0026 Groceries","value":1500.0,"available":100.0,"tickets":{"required":4,"partList":["8H69A",4,"8H70B",8,"8H71C",13,"8H72D",0,null,null,null,null,null,null,null,null,null],"winner":"8H72D"},"startAvailable":100.0,"viewId":"p17"},
{"_id":{"$oid":"56d0de26a1f6053f7b7f5a7c"},"name":"LED HD TV","value":1500.0,"available":100.0,"tickets":{"required":4,"partList":["8J65A",10,"8J66B",0,"8J67C",8,"8J68D",8,null,null,null,null,null,null,null,null,null],"winner":"8J66B"},"startAvailable":100.0,"viewId":"p16"},
{"_id":{"$oid":"56d0dea1a1f6053f7b7f5a7d"},"name":"$5000 Grocery Card","value":5000.0,"available":50.0,"tickets":{"required":4,"partList":["8G73A",3,"8G74B",7,"8G75C",0,"8G76D",16,null,null,null,null,null,null,null,null,null],"winner":"8G75C"},"startAvailable":50.0,"viewId":"p15"},
{"_id":{"$oid":"56d0df31a1f6053f7b7f5a7e"},"name":"$5000 Cash","value":5000.0,"available":50.0,"tickets":{"required":4,"partList":["8F77A",0,"8F78B",10,"8F79C",8,"8F80D",3,null,null,null,null,null,null,null,null,null],"winner":"8F77A"},"startAvailable":50.0,"viewId":"p14"},
{"_id":{"$oid":"56d0dffda1f6053f7b7f5a7f"},"name":"Smart Watch","value":300.0,"available":600.0,"tickets":{"required":4,"partList":["8P45A",12,"8P46B",6,"8P47C",0,"8P48D",10,null,null,null,null,null,null,null,null,null],"winner":"8P47C"},"startAvailable":600.0,"viewId":"p13"},
{"_id":{"$oid":"56d0e06ca1f6053f7b7f5a80"},"name":"Family Picnic","value":200.0,"available":750.0,"tickets":{"required":4,"partList":["8Q41A",0,"8Q42B",7,"8Q43C",3,"8Q44D",8,null,null,null,null,null,null,null,null,null],"winner":"8Q41A"},"startAvailable":750.0,"viewId":"p12"},
{"_id":{"$oid":"56d0e0eba1f6053f7b7f5a81"},"name":"$200 Cash","value":200.0,"available":750.0,"tickets":{"required":4,"partList":["8R37A",7,"8R38B",9,"8R39C",9,"8R40D",0,null,null,null,null,null,null,null,null,null],"winner":"8R40D"},"viewId":"p10"},
{"_id":{"$oid":"56d0e168a1f6053f7b7f5a82"},"name":"$50 Grocery Gift Card","value":50.0,"available":5000.0,"tickets":{"required":4,"partList":["8V25A",6,"8V26B",6,"8V27C",0,"8V28D",8,null,null,null,null,null,null,null,null,null],"winner":"8V27C"},"viewId":"p11"},
{"_id":{"$oid":"56d0e1ffa1f6053f7b7f5a83"},"name":"$100 Cash","value":100.0,"available":2500.0,"tickets":{"required":4,"partList":["8T29A",8,"8T30B",7,"8T31C",7,"8T32D",0,null,null,null,null,null,null,null,null,null],"winner":"8T32D"},"viewId":"p9"},
{"_id":{"$oid":"56d0e257a1f6053f7b7f5a84"},"name":"$100 Grocery Gift Card","value":100.0,"available":2500.0,"tickets":{"required":4,"partList":["8S33A",11,"8S34B",0,"8S35C",8,"8S36D",9,null,null,null,null,null,null,null,null,null],"winner":"8S34B"},"viewId":"p8"},
{"_id":{"$oid":"56d0e372a1f6053f7b7f5a85"},"name":"$1,000,000","value":1e+06,"available":3.0,"tickets":{"required":8,"partList":["8Z01A",8,"8Z02B",3,"8Z03C",3,"8Z04D",6,"8Z05E",7,"8Z06F",7,"8Z07G",0,"8Z08H",0,null],"winner":"8Z07G"},"viewId":"p27"},
{"_id":{"$oid":"56d0e448a1f6053f7b7f5a86"},"name":"Vacation Home","value":1e+06,"available":3.0,"tickets":{"required":8,"partList":["8Y09A",18,"8Y10B",7,"8Y11C",7,"8Y12D",10,"8Y13E",9,"8Y14F",0,"8Y15G",5,"8Y16H",1,null],"winner":"8Y14F"},"viewId":"p26"},
{"_id":{"$oid":"56d0e684a1f6053f7b7f5a87"},"name":"Cash or Luxury Car","value":100000.0,"available":15.0,"tickets":{"required":5,"partList":["8E81A",3,"8E82B",0,"8E83C",4,"8E84D",10,"8E85E",0,null,null,null,null,null,null,null],"winner":""},"viewId":"p25"},
{"_id":{"$oid":"56d0e728a1f6053f7b7f5a88"},"name":"Home Makeover","value":40000.0,"available":25.0,"tickets":{"required":5,"partList":["8D86A",0,"8D87B",0,"8D88C",10,"8D89D",10,"8D90E",10,null,null,null,null,null,null,null],"winner":""},"startAvailable":25.0,"viewId":"p24"},
{"_id":{"$oid":"56d0e7aba1f6053f7b7f5a89"},"name":"Vehicle of your choice","value":35000.0,"available":25.0,"tickets":{"required":5,"partList":["8C91A",0,"8C92B",5,"8C93C",0,"8C94D",12,"8C95E",5,null,null,null,null,null,null,null],"winner":""},"startAvailable":25.0,"viewId":"p23"},
{"_id":{"$oid":"56d0e81da1f6053f7b7f5a8a"},"name":"College Tuition","value":20000.0,"available":50.0,"tickets":{"required":5,"partList":["8B96A",8,"8B97B",13,"8B98C",13,"8B99D",0,"8B00E",0,null,null,null,null,null,null,null],"winner":""},"viewId":"p22"},
{"_id":{"$oid":"56d0e89ea1f6053f7b7f5a8b"},"name":"4-Wheeler","value":10000.0,"available":50.0,"tickets":{"required":5,"partList":["9A02A",9,"9A03B",0,"9A04C",0,"9A05D",4,"9A06E",10,null,null,null,null,null,null,null],"winner":""},"viewId":"p21"},
{"_id":{"$oid":"56d0e90ba1f6053f7b7f5a8c"},"name":"Family Vacation","value":10000.0,"available":50.0,"tickets":{"required":5,"partList":["9B07A",0,"9B08B",9,"9B09C",7,"9B10D",0,"9B11E",8,null,null,null,null,null,null,null],"winner":"9B07A"},"startAvailable":50.0,"viewId":"p20"},
{"_id":{"$oid":"56d0e98ba1f6053f7b7f5a8d"},"name":"Fandango Gift Card","value":25.0,"available":10000.0,"tickets":{"required":4,"partList":["9D16A",0,"9D17B",10,"9D18C",11,"9D19D",6,null,null,null,null,null,null,null,null,null],"winner":"9D16A"},"viewId":"p3"},
{"_id":{"$oid":"56d0e9eca1f6053f7b7f5a8e"},"name":"$25 Mall Gift Card","value":25.0,"available":10000.0,"tickets":{"required":4,"partList":["8X17A",8,"8X18B",0,"8X19C",5,"8X20D",9,null,null,null,null,null,null,null,null,null],"winner":"8X18B"},"viewId":"p2"},
{"_id":{"$oid":"56d0ea40a1f6053f7b7f5a8f"},"name":"$25 Grocery Gift Card","value":25.0,"available":10000.0,"tickets":{"required":4,"partList":["8W21A",0,"8W22B",8,"8W23C",11,"8W24D",9,null,null,null,null,null,null,null,null,null],"winner":"8W21A"},"viewId":"p1"},
{"_id":{"$oid":"56d0eaa2a1f6053f7b7f5a90"},"name":"$500 Grocery Gift Card","value":500.0,"available":350.0,"tickets":{"required":4,"partList":["8N49A",14,"8N50B",9,"8N51C",0,"8N52D",3,null,null,null,null,null,null,null,null,null],"winner":"8N51C"},"viewId":"p0"},
{"_id":{"$oid":"589fad4d0aee383e8a17aa79"},"name":"$1000 Cash","value":1000,"available":100,"tickets":{"required":4,"partList":["8K61A",10,"8K62B",8,"8K63C",14,"8K64D",0,null,null,null,null,null,null,null,null,null],"winner":"8K64D"},"startAvailable":100,"viewId":"p28"},
{"_id":{"$oid":"589fb0210aee383e8a17aa7f"},"name":"$1000 Grocery Card","value":1000,"available":100,"tickets":{"required":4,"partList":["8L57A",0,"8L58B",6,"8L59C",5,"8L60D",7,null,null,null,null,null,null,null,null,null],"winner":"8L57A"},"startAvialable":100,"viewId":"p29"},
{"_id":{"$oid":"589fb1fb0aee383e8a17aa82"},"name":"Laptop Computer","value":1000,"available":100,"tickets":{"required":4,"partList":["8M53A",6,"8M54B",0,"8M55C",6,"8M56D",9,null,null,null,null,null,null,null,null,null],"winner":"8M54B"},"startAvailable":100,"viewId":"p30"}];
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/allPrizeData', function(req, res){
  res.json(prizeData);
});

app.post('/updatePrize', function(req, res){
  res.json({'called':'post'});
});

module.exports = app;