const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Thiếu username hoặc password');
    }

    const newUser = new User({ username, password });

    try {
        await newUser.save();
        console.log('User saved:', { username, password });

        return res.status(200).send(`Saved username: ${username}`);
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).send('Lỗi khi lưu người dùng');
    }
});

module.exports = router;
