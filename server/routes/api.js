var express = require('express'),
    appMiddleware = require('../middlewares'),
    users = require('../controllers/users'),
    types = require('../controllers/types'),
    router = express.Router();

router.use(appMiddleware.generateRequestUUID);
router.use(users.loginRequired);

router.get('/users', users.getUsers);
router.post('/users', users.register);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.remove);

router.get('/types', types.getTypes);
router.get('/types/:id', types.getType);
router.post('/types', types.add);
router.put('/types/:id', types.update);
router.delete('/types/:id', types.remove);

module.exports = router;
