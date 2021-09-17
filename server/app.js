const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const { User } = require('./db/models');
const { authUser } = require('./authHelper');

// create store for sessions to persist in our database
const sessionStore = new SequelizeStore({ db });

const { json, urlencoded } = express;

const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

// exclude TRACE and TRACK methods to avoid XST attacks.
app.use((req, res, next) => {
  const allowedMethods = [
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ];

  if (!allowedMethods.includes(req.method)) {
    res.status(405).send(`${req.method} not allowed.`);
  }

  next();
});

// Check the cookie sent by the client for any request and set the req.user to the authenticated user
app.use(function (req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decodedToken) => {
      if (err) {
        return next();
      }
      User.findOne({
        where: { id: decodedToken.id },
      }).then((user) => {
        req.user = user;
        return next();
      });
    });
  } else {
    return next();
  }
});

// require api routes here after I create them
// Register my routers to the app
app.use('/auth', require('./routes/auth'));
app.use('/api', authUser, require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = { app, sessionStore };
