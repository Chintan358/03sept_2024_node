const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")
const hbs = require("hbs")
const mongoose  = require("mongoose")
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect(process.env.DB_URL).then(()=>{  
    console.log("DB connected successfully");
}).catch(err=>{
    console.log(err);
})


const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")
const publicPath = path.join(__dirname,"../public")


app.set("view engine","hbs")
app.set("views",viewPath)
app.use(express.static(publicPath))

app.use("/",require("../router/userrouter"))

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    
})