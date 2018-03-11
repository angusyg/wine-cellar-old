const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../config');
const ApiError = require('../helpers/apierror');

const loginEndpoint = config.api.endpoints.login;
const refreshTokenEndpoint = config.api.endpoints.refreshToken;
const refreshTokens = new Map();
const service = {};

function registerRefreshToken(user) {
  const refreshToken = uuidv4();
  return User.findOne({
      _id: user._id
    })
    .catch((err) => {
      throw new ApiError(loginEndpoint.errors[1])
    })
    .then((user) => {
      console.log(user);
      user.refreshToken = refreshToken;
      user.save();
      return refreshToken
    });
}

service.login = infos => new Promise((resolve, reject) => {
  // let u = User.create();
  // u.login = 'admin';
  // u.password = 'admin';
  // u.roles = ['ADMIN'];
  // u.save();
  User.findOne({
      login: infos.login,
    })
    .catch(err => reject(err))
    .then((user) => {
      if (!user) reject(new ApiError(loginEndpoint.errors[1]));
      else {
        user.comparePassword(infos.password)
          .catch(err => reject(err))
          .then((match) => {
            if (match) {
              registerRefreshToken(user)
                .catch(err => reject(err))
                .then((refreshToken) => {
                  resolve({
                    refreshToken,
                    accessToken: jwt.sign({
                      login: user.login,
                      roles: user.roles,
                      exp: Math.floor(Date.now() / 1000) + config.api.accessTokenExpirationTime,
                    }, config.tokenSecretKey),
                  });
                });
            } else reject(new ApiError(loginEndpoint.errors[2]));
          });
      }
    });
});

service.refreshToken = (infos, refresh) => new Promise((resolve, reject) => {
  User.findOne({
      login: infos.login,
    })
    .catch(err => reject(err))
    .then((user) => {
      if (!user) reject(new ApiError(refreshTokenEndpoint.errors[1]));
      else if (refreshTokens.get(refresh) === infos.login) {
        registerRefreshToken(user.login)
          .catch(err => reject(err))
          .then((refreshToken) => {
            resolve({
              refreshToken,
              accessToken: jwt.sign({
                login: user.login,
                roles: user.roles,
                exp: Math.floor(Date.now() / 1000) + config.api.accessTokenExpirationTime,
              }, config.tokenSecretKey),
            });
          });
      } else {
        reject(new ApiError(refreshTokenEndpoint.errors[2]));
      }
    });
});

module.exports = service;
