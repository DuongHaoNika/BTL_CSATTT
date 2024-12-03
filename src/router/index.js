const express = require('express')
const indexController = require('../controllers/index')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('qldt')
})

router.post("/login", indexController.login)

router.get("/forgetpass", indexController.quenmatkhau)

module.exports = router