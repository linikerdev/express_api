const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth.json')


const User = require('./model');


const allUsers = async (req, res) => {
    try {
        let data = await User.find()
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({
            message: 'registration faleid',
            err: err.message
        });
    }


}

const createUser = async (req, res) => {
    const { email } = req.body

    try {

        if (await User.findOne({ email })) {
            return res.status(400).json({
                error: `Usuário ${email} já existe na base de dados`
            });
        }
        const user = await User.create(req.body);

        user.password = undefined;

        res.json({
            user: user,
            token: generateToken(user.id)
        });
    } catch (err) {
        return res.status(400).json({
            error: 'registration faleid',
            err: err.message
        });
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    //user not exists
    if (!user) {
        return res.status(400).json({ error: 'User Not Exists' });
    }
    // passowords not exists
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'Invalid Passoword' });
    }

    user.password = undefined;

    res.json({
        user: user,
        token: generateToken(user.id)
    })

};

function generateToken(id) {
    return jwt.sign({ id: id }, secret, {
        expiresIn: 3600
    });
}


module.exports = {
    allUsers,
    createUser,
    authenticate
};