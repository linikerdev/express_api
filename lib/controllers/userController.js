'use strict';

var express = require('express');
var User = require('./../models/user');

var authMiddleware = require('../middlewares/auth');

//define router
var router = express.Router();

router.use(authMiddleware);

router.get('/', async function (req, res) {
    var data = await User.find();
    res.json({
        data: data
    });
});

module.exports = function (app) {
    return app.use('/user', router);
};