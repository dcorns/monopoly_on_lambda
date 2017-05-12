/**
 * runLambda
 * Created by dcorns on 5/12/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Use to emulate AWS lambda functions locally
 * unfortunatly due to no current support for es6 modules in node, index.js files must be ediited from exports.handler= to module.exports =
 */
'use strict';
const fs = require('fs');
const args = process.argv;
console.log('args:',args);
const handlerPath = args[2];
let event;
event = JSON.parse(fs.readFileSync(`${__dirname}/${handlerPath}/lambda-event.json`,'utf8'));
let context;
context = fs.readFileSync(`${__dirname}/${handlerPath}//lambda-context.json`,'utf8');
const handler = require(`./${handlerPath}/index.js`);
const cb = (err, data) => {
  if(err) return console.error(err);
  console.log(data);
};
console.log('********************EVENT and CONTEXT INPUT***************************');
console.log('event:',event);
console.log('context:',context);
console.log(handler);
console.log('********************LAMBDA FUNCTION OUTPUT****************************');
handler(event, context, cb);