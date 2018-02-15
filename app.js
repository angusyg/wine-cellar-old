const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('./server/helpers/logger').server,
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware'),
    appMiddleware = require('./server/helpers/middlewares'),
    indexRoute = require('./server/routes/index'),
    loggerRoute = require('./server/routes/logger'),
    apiRoute = require('./server/routes/api'),
    config = require('./config');

let app = express();

// configuration
app.set('config', config);

// view configuration
app.set('views', path.join(__dirname, 'views', 'pug'));
app.set('view engine', 'pug');

// middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(sassMiddleware({
    src: path.join(__dirname, 'views', 'stylesheets'),
    dest: path.join(__dirname, 'public', 'stylesheets'),
    indentedSyntax: true,
    sourceMap: true,
    prefix: '/stylesheets'
}));
app.use(appMiddleware.generateRequestUUID);
app.use(express.static(path.join(__dirname, 'public')));

// map modules routes
app.use('/', indexRoute);
app.use('/logger', loggerRoute);
app.use('/api', apiRoute);

app.use(appMiddleware.errorMapper);
app.use(appMiddleware.errorHandler);

module.exports = app;