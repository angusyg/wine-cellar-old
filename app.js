const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const appMiddleware = require('./src/server/helpers/middlewares');
const loggerRoute = require('./src/server/routes/logger');
const apiRoute = require('./src/server/routes/api');
const config = require('./config');

const app = express();

// configuration: DB connection
config.connectDb();

// middlewares
app.use(favicon(path.join(__dirname, 'src', 'client', 'public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(appMiddleware.generateRequestUUID);

// Static files
app.use(express.static(path.join(__dirname, 'src', 'client', 'public')));

// map modules routes
app.use('/logger', loggerRoute);
app.use('/api', apiRoute);

app.use(appMiddleware.errorMapper);
app.use(appMiddleware.errorHandler);

module.exports = app;
