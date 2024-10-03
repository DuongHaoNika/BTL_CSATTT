const loginService = require("../services/loginService")
const User = require("../models/user.model.js")
const login = async (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    const result = await loginService.login(username, password)
    if(result == 1) {
        const user = new User(req.body);
        await user.save();
        return res.render('index')
    }
    else {
        return res.render('qldt', {err: "err"})
    }
}

module.exports = { login }