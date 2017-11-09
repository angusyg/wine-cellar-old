var express = require('express'),
    router = express.Router(),
    logger = require('../helpers/logger').client;

router.post('/:level', function(req, res, next) {
    logger[req.params.level]('[IP:' + req.ip + '] ' + req.body.message);
    res.status(200).end();
});

module.exports = router;
