var mongoose = require('mongoose'),
    Type = mongoose.model('Type'),
    srv = {};

srv.getTypes = function(callback) {
    Type.find({}, function(err, types) {
        if (err) callback(err, null);
        else callback(null, types);
    });
};

srv.getType = function(id, callback) {
    Type.findById(id, function(err, type) {
        if (err) callback(err, null);
        else callback(null, type);
    });
};

srv.add = function(type, callback) {
    var newType = new Type(type);
    newType.save(function(err, type) {
        if (err) callback(err, null);
        else callback(null, type);
    });
};

srv.remove = function(id, callback) {
    Type.remove({
        _id: id
    }, function(err) {
        if (err) callback(err, null);
        else callback(null, null);
    });
};

srv.update = function(id, type, callback) {
    Type.findById(id, function(err, t) {
        if (err) callback(err, null);
        else {
            t.name = type.name;
            t.description = type.description;
            t.color = type.color;
            t.save(function(err, updatedType) {
                if (err) callback(err, null);
                else callback(null, updatedType);
            });
        }
    });
};

module.exports = srv;
