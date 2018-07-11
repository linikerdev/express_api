const express = require('express');
const bodyParser = require('body-parser');

//controllers
// const authController = require('./controllers/authController');
const userController = require('./api/user/route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Router Controller
userController(app);

app.listen(3001, console.log('rodando na porta 3001'));