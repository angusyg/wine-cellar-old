const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const appMiddleware = require('./server/helpers/middlewares');
const indexRoute = require('./server/routes/index');
const loggerRoute = require('./server/routes/logger');
const apiRoute = require('./server/routes/api');
const config = require('./config');

const app = express();

// configuration
app.set('config', config);

// view configuration
app.set('views', path.join(__dirname, 'views', 'pug'));
app.set('view engine', 'pug');

// middlewares
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'views', 'stylesheets'),
  dest: path.join(__dirname, '..', 'public', 'stylesheets'),
  indentedSyntax: true,
  sourceMap: true,
  prefix: '/stylesheets',
}));
app.use(appMiddleware.generateRequestUUID);
app.use(express.static(path.join(__dirname, '..', 'public')));

// map modules routes
app.use('/', indexRoute);
app.use('/logger', loggerRoute);
app.use('/api', apiRoute);

app.use(appMiddleware.errorMapper);
app.use(appMiddleware.errorHandler);

module.exports = app;
