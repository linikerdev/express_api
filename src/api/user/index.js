const { Router } = require('express')
const { userAll } = require('./controller')

const authMiddleware = require('../../middlewares/auth')

const router = Router()
router.use(authMiddleware)

router.get('/all/', userAll)

module.exports = app => app.use('/user', router);
