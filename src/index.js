const express = require('express');
const bodyParser = require('body-parser');

//controllers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Router Controller
authController(app);
userController(app);


app.listen(3001, console.log('rodando na porta 3001'));