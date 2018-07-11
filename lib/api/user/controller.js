"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = async function (req, res) {
    var data = await User.find();
    res.json({
        data: data
    });
};
// module.exports = app => app.use('/user', router);