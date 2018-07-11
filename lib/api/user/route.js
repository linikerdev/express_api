'use strict';

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var User = require('./../models/user');


// const authMiddleware = require('../middlewares/auth');

//define router
var router = express.Router();

router.use(authMiddleware);

router.get('/', _controller2.default);

module.exports = function (app) {
  return app.use('/user', router);
};