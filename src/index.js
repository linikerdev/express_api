const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Router Controller
authController(app);


app.listen(3001, console.log('rodando na porta 3001'));