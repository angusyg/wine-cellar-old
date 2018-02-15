const express = require('express'),
    config = require('../../config'),
    logger = require('../helpers/logger').client,
    router = express.Router();

router.post('/:level', function(req, res, next) {
    logger[req.params.level]('[IP:' + req.ip + '] ' + req.body.message);
    res.status(config.httpStatus.noContent).end();
});

module.exports = router;