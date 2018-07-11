'use strict';

var express = require('express');
var User = require('./../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var _require = require('../config/auth'),
    secret = _require.secret;

//define router


var router = express.Router();

router.post('/register', async function (req, res) {
    var email = req.body.email;


    try {

        if (await User.findOne({ email: email })) {
            return res.status(400).json({
                error: 'Usu\xE1rio ' + email + ' j\xE1 existe na base de dados'
            });
        }

        var user = await User.create(req.body);

        user.password = undefined;

        res.json({
            user: user,
            token: generateToken(user.id)
        });
    } catch (err) {
        return res.status(400).json({
            error: 'registration faleid'
        });
    }
});

router.post('/authenticate', async function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;


    var user = await User.findOne({ email: email }).select('+password');

    //user not exists
    if (!user) {
        return res.status(400).json({ error: 'User Not Exists' });
    }
    // passowords not exists
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid Passoword' });
    }

    user.password = undefined;

    res.json({
        user: user,
        token: generateToken(user.id)
    });
});

//function generate token

function generateToken(id) {
    return jwt.sign({ id: id }, secret, {
        expiresIn: 3600
    });
}

module.exports = function (app) {
    return app.use('/auth', router);
};