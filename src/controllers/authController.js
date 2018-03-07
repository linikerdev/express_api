const express = require('express');
const User = require('./../models/user');

//define router
const router = express.Router();

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {

        if (await User.findOne({ email })) {
            return res.status(400).json({
                error: `Usuário ${email} já existe na base de dados` 
            });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        res.json({
            data: user
        });
    } catch (err) {
        return res.status(400).json({
            error: 'registration faleid'
        });
    }
});

module.exports = app => app.use('/auth', router);