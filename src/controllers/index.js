const { body, validationResult } = require('express-validator');
const loginService = require("../services/loginService");
const User = require("../models/user.model.js");

const login = [
    body('username')
        .isAlphanumeric()
        .withMessage('Username phải là ký tự chữ và số'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password phải có ít nhất 6 ký tự'),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array()[0])
            if (errors.array().length == 1) {
                return res.render('qldt', { error1: errors.array()[0] });
            }


            return res.render('qldt', { error1: errors.array()[0], error2: errors.array()[1] });


        }
        const { username, password } = req.body;

        const isAuthenticated = await loginService.login(username, password);

        if (isAuthenticated) {
            const user = new User(req.body);
            await user.save();

            return res.render('index');
        } else {
            return res.render('qldt', { err: "Mật khẩu không chính xác" });
        }
    }
];

module.exports = { login };
