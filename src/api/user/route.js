const express = require('express');
const User = require('./model')
const { allUsers, createUser , authenticate} = require('./controller')


const authMiddleware = require('../../middlewares/auth');

//define router
const router = express.Router();

// router.use(authMiddleware);

router.get('/', allUsers);
router.post('/create', [authMiddleware], createUser);
router.post('/authenticate', authenticate);

module.exports = app => app.use('/user', router);