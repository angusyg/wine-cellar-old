// includes
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('./server/helpers/logger').server,
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware'),
    helmet = require('helmet'),
    // custom middlewares
    appMiddleware = require('./server/middlewares'),
    // modules models
    usersModel = require('./server/models/users'),
    // modules routes
    indexRoute = require('./server/routes/index'),
    clientRoute = require('./server/routes/client'),
    authRoute = require('./server/routes/auth'),
    loggerRoute = require('./server/routes/logger'),
    apiRoute = require('./server/routes/api'),
    config = require('./config').init();

var app = express();

// configuration
app.set('config', config);

// view configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(appMiddleware.extractUserFromToken);
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'client', 'stylesheets'),
    dest: path.join(__dirname, 'public', 'stylesheets'),
    indentedSyntax: true,
    sourceMap: true,
    prefix: '/stylesheets'
}));
app.use(express.static(path.join(__dirname, 'public')));

// map modules routes
app.use('/', indexRoute);
app.use('/client', clientRoute);
app.use('/auth', authRoute);
app.use('/logger', loggerRoute);
app.use('/api', apiRoute);

app.use(appMiddleware.errorMapper);
app.use(appMiddleware.errorHandler);

module.exports = app;
