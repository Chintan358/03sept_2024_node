
const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const mongoose = require("mongoose")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
require("dotenv").config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
mongoose.connect(DB_URL).then(() => {
    console.log("Db connected");

})


const viewpath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")
const publicpath = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.set("views", viewpath)
app.use(express.static(publicpath))
hbs.registerPartials(partialpath)

app.use("/", require("../router/userrouter"))
app.use("/", require("../router/adminrouter"))


app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);

})