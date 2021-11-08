const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const { authenticateToken, authUser } = require('./authHelper');

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
    res.status(403).send(`${req.method} not allowed.`);
  }

  next();
});

// require api routes here after I create them
// Register my routers to the app
app.use('/auth', authenticateToken, require('./routes/auth')); // authToken for current user and logout routes
app.use('/api', authenticateToken, authUser, require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError());
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
