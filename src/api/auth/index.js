const { Router } = require('express')
const { register, authenticate } = require('./controller')

const router = Router()

router.post('/register', register)
router.post('/authenticate', authenticate)

module.exports = app => app.use('/auth', router);
