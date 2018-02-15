const express = require('express'),
    config = require('../../config'),
    apiController = require('../controllers/api'),
    router = express.Router();

router.get(config.api.discover, apiController.discover);

module.exports = router;