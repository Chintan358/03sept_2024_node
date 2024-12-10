
const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const mongoose = require("mongoose")
require("dotenv").config()
const PORT = process.env.PORT


const viewpath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")
const publicpath = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.set("views", viewpath)
app.use(express.static(publicpath))
hbs.registerPartials(partialpath)

app.use("/", require("../router/userrouter"))



app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);

})