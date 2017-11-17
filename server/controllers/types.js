var typesService = require('../services/types'),
    ctrl = {};

ctrl.getTypes = function(req, res) {
    typesService.getTypes(function(err, types) {
        if (err) throw err;
        res.json(types);
    });
};

ctrl.getType = function(req, res) {
    typesService.getType(req.params.id, function(err, type) {
        if (err) throw err;
        res.json(type);
    });
};

ctrl.add = function(req, res) {
    typesService.add(req.body, function(err, type) {
        if (err) throw err;
        res.json(type);
    });
};

ctrl.remove = function(req, res) {
    typesService.remove(req.params.id, function(err) {
        if (err) throw err;
        res.status(204).send();
    });
};

ctrl.update = function(req, res) {
    typesService.update(req.params.id, req.body, function(err, type) {
        if (err) throw err;
        res.json(type);
    });
};

module.exports = ctrl;
