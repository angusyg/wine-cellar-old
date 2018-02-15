const app = require('../app'),
    debug = require('debug')('#APP_NAME#:server'),
    http = require('http'),
    logger = require('./helpers/logger').server,
    config = require('../config'),
    port = normalizePort(config.api.server.port);

// http server
const server = http.createServer(app);

// startup server to listen request, error
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Check if port or named pipe
 * @param  {[type]} val port value
 * @return {[type]}     normalized server port
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    // named pipe ?
    if (isNaN(port)) return val;
    // port number ?
    if (port >= 0) return port;
    return false;
}

/**
 * Handle error on startup of server
 * @param  {[type]} error startup errors
 */
function onError(error) {
    if (error.syscall !== 'listen') throw error;
    let bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// listening event
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

process.on('uncaughtException', function(err) {
    logger.error('Server internal error: "' + err.stack + '"');
    process.exit(1);
});