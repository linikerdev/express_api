'use strict';

var mongoose = require('../../database/index');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    var hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;