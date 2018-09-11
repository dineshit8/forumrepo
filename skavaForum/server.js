var express = require('express');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var routes = require("./routes/routes.js");
var cookieParser = require('cookie-parser'); 
const expressValidator = require('express-validator');
var nodemailer = require('nodemailer');
var session = require('express-session')
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session(
  {
  secret: 'ssshhhhh',
  resave : true,
  saveUninitialized: true,
  cookie: {
    path: "/",
    maxAge:  300000,
    secure : false
  }
}

));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
routes(app);
var port = process.env.PORT || 8080; 
var server = app.listen(port, function () {
  console.log("app running on port.", server.address().port);
});

