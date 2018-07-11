const express = require('express');
const User = require('./../models/user');

const authMiddleware = require('../middlewares/auth');


//define router
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    var data = await User.find();
    res.json({
        data: data
    });
});

module.exports = app => app.use('/user', router);