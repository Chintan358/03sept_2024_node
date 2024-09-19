const express = require("express")
const app = express()
const PORT = 3000
const path = require("path")
const hbs = require("hbs")


const viewPath = path.join(__dirname,"../Templates/views")
const partialPath = path.join(__dirname,"../Templates/partials")
const publicPath = path.join(__dirname,"../public")


app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))

app.get("/",(req,resp)=>{
    resp.render("index",{name:"Nirmal"})
})

app.get("/home",(req,resp)=>{
    resp.render("home")
})

app.get("/about",(req,resp)=>{
    resp.render("about")
})

app.get("/contact",(req,resp)=>{
    resp.render("contact")
})

app.listen(PORT,(req,resp)=>{
    console.log(`server running on port : ${PORT}`);
    
})