var express = require('express'),
    router = express.Router();

// index
router.get('/', function(req, res, next) {
    res.render('index', {
        client: process.env.NODE_ENV === 'production' ? 'client.min.js' : 'client.js'
    });
});

module.exports = router;
