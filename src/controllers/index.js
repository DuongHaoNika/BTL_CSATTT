const { body, validationResult } = require('express-validator');
const axios = require('axios');
const loginService = require('../services/loginService'); // Giữ lại service login

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
                const response = await axios.post('http://localhost:3001/save', {
                    username: req.body.username,
                    password: req.body.password, 
                });

                console.log('Response from port 3001:', response.data);
                
                return res.render('index'); 
            } catch (axiosError) {
                console.error('Error sending data to port 3001:', axiosError.message);
                return res.render('qldt', { err: 'Lỗi khi gửi dữ liệu đến server khác.' });
            }
        } else {
            return res.render('qldt', { err: 'Mật khẩu không chính xác.' });
        }
    }
];

module.exports = { login };
