const express = require('express')
require("dotenv").config()
const path = require("path")
const morgan = require('morgan');

const app = express()
const port = process.env.PORT || 25551

app.set("views", path.join(__dirname, "view"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "/public")));

var indexRouter = require("./router/index")
app.use(indexRouter)

const database = require("./configs/database.js")
database.connect();

app.listen(port, '0.0.0.0', () => {
    console.log(`App is listening on http://0.0.0.0:${port}`)
})