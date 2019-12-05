require('dotenv').config();

let http = require('http');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var app = express();

let passport = require('passport')
const connectDB = require(`./connections/mongo.js`);

app.use(cookieParser());
app.use(session({
  secret: 'anystringoftext',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

let testRouter = require('./routes/index');
let authRouter = require('./routes/profile/profile-router');
app.use('/', testRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server runs on http://localhost:${process.env.PORT}; Ctrl+C for exit `);
  connectDB();
});