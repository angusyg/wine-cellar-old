var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    srv = {};

srv.getUserByLogin = function(login, callback) {
    User.find({
        login: login
    }, function(err, user) {
        if (err) callback(err, null);
        else callback(null, user);
    });
};

srv.getUsers = function(callback) {
    User.find({}, function(err, users) {
        if (err) callback(err, null);
        else callback(null, users);
    });
};

srv.login = function(infos, callback) {
    User.findOne({
        login: infos.login
    }, function(err, user) {
        if (err) callback(err, null);
        else if (!user) callback(null, null);
        else user.comparePassword(infos.password, function(err, isMatch) {
            if (err) callback(err, null);
            else if (isMatch) callback(null, {
                token: jwt.sign({
                    login: user.login,
                    _id: user._id
                }, 'RESTFULAPIs')
            });
            else callback(null, null);
        });
    });
};

srv.register = function(user, callback) {
    var newUser = new User(user);
    newUser.save(function(err, user) {
        if (err) callback(err, null);
        else {
            user.hash_password = undefined;
            callback(null, user);
        }
    });
};

srv.remove = function(id, callback) {
    User.remove({
        _id: id
    }, function(err) {
        if (err) callback(err, null);
        else callback(null, null);
    });
};

srv.update = function(user, callback) {
    User.findById(user._id, function(err, u) {
        if (err) callback(err, null);
        else {
            u.login = user.login;
            u.email = user.email;
            u.password = user.password;
            u.role = user.role;
            u.save(function(err, updatedUser) {
                if (err) callback(err, null);
                else callback(null, updatedUser);
            });
        }
    });
};

module.exports = srv;
