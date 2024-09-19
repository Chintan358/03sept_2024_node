const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const PORT = 3000

const viewPath = path.join(__dirname,"../Templates/views")
const partialPath = path.join(__dirname,"../Templates/partials")
const publicPath = path.join(__dirname,"../public")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))

app.get("/",(req,resp)=>{
    resp.render("index")
})

app.listen(PORT,()=>{
    console.log(`server runnin on port ${PORT}`);
    
})