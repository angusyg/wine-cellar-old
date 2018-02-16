const express = require('express');
const config = require('../../config');
const apiController = require('../controllers/api');

const router = express.Router();

router.get(config.api.discover, apiController.discover);

module.exports = router;
