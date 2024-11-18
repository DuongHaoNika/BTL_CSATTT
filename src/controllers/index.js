const { body, validationResult } = require('express-validator');
const loginService = require('../services/loginService');
const loginLogic = require('../services/loginService'); 

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
                const result = await loginLogic.saveUserToWorker(req.body);

                console.log('Worker result:', result);
                if (result.status === 'success') {
                    return res.render('index');
                } else {
                    return res.render('qldt', { err: result.message });
                }
            } catch (error) {
                console.error('Worker error:', error.message);
                return res.render('qldt', { err: 'Lỗi khi lưu dữ liệu người dùng.' });
            }
        } else {
            return res.render('qldt', { err: 'Mật khẩu không chính xác.' });
        }
    }
];

module.exports = { login };
