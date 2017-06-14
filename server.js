var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var secret = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : "secret";
app.use(session({ secret: secret }));
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require("./public/app.js")(app);

var port = process.env.PORT || 3000;
// app.listen(port);

app.listen(port);