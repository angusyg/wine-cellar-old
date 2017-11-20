var usersCtrl = require('../controllers/users'),
    express = require('express'),
    router = express.Router();

router.all('/secure/*', usersCtrl.loginRequired);

// secure page of angular client
router.get('/secure/:page', function(req, res, next) {
    res.render('client/secure/' + req.params.page);
});

// page of angular client
router.get('/:page', function(req, res, next) {
    res.render('client/' + req.params.page);
});

// page of angular client
router.get('/directives/:page', function(req, res, next) {
    res.render('client/directives/' + req.params.page);
});

module.exports = router;
