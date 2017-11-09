var usersService = require('../services/users'),
    ctrl = {};

ctrl.getUsers = function(req, res) {
    usersService.getUsers(function(err, users) {
        if (err) throw err;
        res.json(users);
    });
};

ctrl.login = function(req, res) {
    usersService.login(req.body, function(err, token) {
        if (err) throw err;
        if (token) res.json(token);
        else res.status(401).json({
            message: 'Authentication failed',
            reqId: req.uuid
        });
    });
};

ctrl.loginRequired = function(req, res, next) {
    if (req.user) next();
    else res.status(401).json({
        message: 'Unauthorized user',
        reqId: req.uuid
    });
};

ctrl.register = function(req, res) {
    usersService.register(req.body, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
};

ctrl.remove = function(req, res) {
    usersService.remove(req.params.id, function(err) {
        if (err) throw err;
        res.status(204).send();
    });
};

ctrl.update = function(req, res) {
    usersService.update(req.body, function(err, user) {
        if (err) throw err;
        res.json(user);
    });
};

module.exports = ctrl;
