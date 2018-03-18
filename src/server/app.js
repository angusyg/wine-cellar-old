const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const minify = require('express-minify');
const uglifyEs = require('uglify-es')
const appMiddleware = require('./helpers/middlewares');
const loggerRoute = require('./routes/logger');
const apiRoute = require('./routes/api');
const config = require('./config');

const app = express();

// configuration: DB connection
config.connectDb();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(appMiddleware.generateRequestUUID);

// Static files
app.use(compression());
app.use((req, res, next) => {
  if (/js\/client\.js/.test(req.url) && process.env.NODE_ENV === 'production') req.url = '/js/client.min.js';
  next();
});
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// map modules routes
app.use('/logger', loggerRoute);
app.use('/api', apiRoute);

app.use(appMiddleware.errorMapper);
app.use(appMiddleware.errorHandler);

module.exports = app;
