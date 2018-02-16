const express = require('express');
const config = require('../../config');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    client: process.env.NODE_ENV === 'production' ? 'client.min.js' : 'client.js',
    apiListUrl: config.api.server.protocol + config.api.server.host + (config.api.server.port ? `:${config.api.server.port}` : '') + config.api.base + config.api.discover,
  });
});

module.exports = router;
