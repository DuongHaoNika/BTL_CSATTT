const loginService = require("../services/loginService")

const login = async (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    const result = await loginService.login(username, password)
    if(result == 1) {
        res.send("OK roi ne")
    }
    else {
        res.send("SAI tk, mk")
    }
}

module.exports = { login }