const express = require('express')
const indexController = require('../controllers/index')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.post("/login", indexController.login)

module.exports = router