const User = require('./../../models/user');


const userAll = async (req, res) => {
    var data = await User.find();
    res.json({
        data: data
    });
}

module.exports = {
    userAll
}