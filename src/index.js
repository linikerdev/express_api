const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//controllers
const auth = require('./api/auth/')
const user = require('./api/user/')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Router Controller
auth(app)

user(app)

app.listen(3001, console.log('rodando na porta 3001'))