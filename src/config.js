const path = require('path');
const fs = require('fs');

const server = {
  protocol: 'http://',
  host: 'localhost',
  port: 8080,
};

function logFolder() {
  const folder = path.join(__dirname, '..', 'logs');
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  return folder;
}

function timestamp() {
  return (new Date()).toLocaleString();
}

module.exports = {
  api: {
    server,
    base: '/api',
    discover: '/discover',
    logger: '/logger',
    endpoints: {},
  },
  httpStatus: {
    serverError: 500,
    unauthorizedAccess: 401,
    unauthorizedOperation: 403,
    notFound: 404,
    ok: 200,
    noContent: 204,
  },
  crossOrigin: {
    origin(origin, callback) {
      const whitelistOrigins = [`${server.protocol + server.host}:${server.port}`];
      if (whitelistOrigins.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    maxAge: 600,
  },
  log: {
    server: {
      file: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        filename: `${logFolder()}/-server.log`,
        datePattern: 'dd-MM-yyyy',
        prepend: true,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
        maxDays: 7,
        timestamp,
      },
      console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp,
      },
      exitOnError: false,
    },
    client: {
      file: {
        level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        filename: `${logFolder()}/-client.log`,
        datePattern: 'dd-MM-yyyy',
        prepend: true,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
        maxDays: 7,
        timestamp,
      },
      console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp,
      },
      exitOnError: false,
    },
  },
};
