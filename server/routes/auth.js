var usersCtrl = require('../controllers/users'),
    appMiddleware = require('../middlewares'),
    express = require('express'),
    router = express.Router();

router.use(appMiddleware.generateRequestUUID);

// registration
router.post('/register', usersCtrl.register);

// authentication
router.post('/login', usersCtrl.login);

module.exports = router;
