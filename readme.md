#monopoly_on_lambda
A JavaScript Collectibles/Inventory management and tracking system built on a server-less architecture, using password-less authentication and token based authorization. This project demonstrates usage of an SVG based UI, Node, and a programming paradigm I call POOF (a hybrid of OOP for modeling and functional programming for logic).
Based on this single user application for tracking monopoly contest game pieces [monopoly](https://github.com/dcorns/monopoly_give_away)
##Project Summary
###Moving to Lambda
####Setting up a node express server on lambda
Considering that the previous project used node express, it seemed logical to first create a starting point for the application using node express on lambda. This was proved later to be a false assumption as the express server becomes irrelevant. However the step involved in implementing the server on lambda are worth noting.
#####The Heavy Road
There is a project called [aws-serverless-express](https://github.com/awslabs/aws-serverless-express) that is promoted for creating a node express server on Lambda and while it works, the process specified for using it involves a number of steps and then copying what it generates over to your new project directory and modifying it for your own purposes. Creating the server this way, in my opinion made the process over complicated. After watching a video put on by someone at amazon(Need to cite if I can remember who it was), I found that setting up the server can be greatly simplified as shown next.
#####The Lightweight Path
All that is required for a working node express server on Lambda:
```javascript
    const awsServerlessExpress = require('aws-serverless-express');
    const app = require('./index');
    const server = awsServerlessExpress.createServer(app);
    exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
```
All your express server code would be found in `index.js`

####Dumping Express Server for S3 and API Gateway
I did not get too far along before I realized that I did not need an express server. Besides, having an express server is not really server-less. There are two things for which I was using the express server. Serving up static assets and routing. Static asset serving is easily handled by AWS S3 and routing was replaced with AWS API Gateway.
#####Moving static assets to AWS S3
Since all the images on the site are SVGs defined in index.html, and this is a single page application, all I needed to store on the S3 container was 3 files. index.html, pack.js(all the javascript compiled into one file using webpack) and main.css. Setting up an S3 bucket for hosting is done in 4 easy steps.
1. Create an S3 Bucket
2. Add the static website hosting property and set the index file to index.html
3. Upload the files
4. Enable read permissions on the the file for everyone.
That's all there is to it. Instant static assets delivered to the client when making the get request to the url provided by the static website hosting property.
######Development Flow
It is good to have a local server to serve up the static pages while developing them. There are a number of ways to achieve this. I simply created a simple express server to do this.
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
app.use(express.static(__dirname + '/client'));
const server = app.listen(port, 'localhost', function(){
  console.log('Server listening on port ' + port);
});
```
#####Moving the routing to AWS API Gateway
API Gateway is not too difficult but it is not nearly as simple as the S3 setup. After a little bit of learning, most of the requirements are just repeated. Since the endpoints will be returning the Lambda functions that make up the server side of the application, it is very important to consider where you want these entry points to be. If you just have a route to every function for the application you will more than likely end up creating holes for hostile users to access directly. This may seem obvious but once you start using Lambda, you may find that you are creating endpoints with every function. A good rule of thumb is to consider if the function would be called directly by the client in a server based back end architecture, then you need to make and endpoint for it, but for all your other Lambda functions, do not make an endpoint. I will go into this in more detail in the Lambda section. Here are the steps for setting up the API gateway.
1.
#####Lambda Quirks
firebase-admin module can not be found until until editing an re-saving index.js
Sometimes lambda tests will fail, even though the function being tested works fine.
