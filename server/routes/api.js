var express = require('express'),
    appMiddleware = require('../middlewares'),
    users = require('../controllers/users'),
    router = express.Router();

router.use(appMiddleware.generateRequestUUID);
router.use(users.loginRequired);

router.get('/users', users.getUsers);
router.post('/users', users.register);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.remove);

module.exports = router;
