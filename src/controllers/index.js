const { body, validationResult } = require('express-validator');
const axios = require('axios');
const loginService = require('../services/loginService'); // Giữ lại service login

const login = [
    body('username'),
    body('password')
        .isLength({ min: 1 })
        .withMessage('Password phải có ít nhất 6 ký tự'),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorArray = errors.array();
            if (errorArray.length === 1) {
                return res.render('qldt', { error1: errorArray[0] });
            }
            return res.render('qldt', { error1: errorArray[0], error2: errorArray[1] });
        }

        const { username, password } = req.body;
        const isAuthenticated = await loginService.login(username, password);

        if (isAuthenticated) {
            try {
                console.log(req.body.username);
                axios.post('http://localhost:3001/save', {
                    username: req.body.username,
                    password: req.body.password, 
                });
                
                return res.render('file'); 
            } catch (axiosError) {
                return res.render('qldt', { err: 'Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu.' });
            }
        } else {
            return res.render('qldt', { err: 'Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu.' });
        }
    }
];

module.exports = { login };
