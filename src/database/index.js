require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGODB);

mongoose.Promise = global.Promise;

module.exports = mongoose;
