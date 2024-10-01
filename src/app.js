const express = require('express')
require("dotenv").config()
const path = require("path")
const morgan = require('morgan');

const app = express()
const port = process.env.PORT || 3000

app.set("views", path.join(__dirname, "view"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))

var indexRouter = require("./router/index")
app.use(indexRouter)

const database = require("./configs/database.js")
database.connect();

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
