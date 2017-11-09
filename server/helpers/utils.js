var utils = {};

utils.handleError = function(error, callback) {
    if (callback) callback(error, null);
    else throw error;
};

module.exports = utils;
