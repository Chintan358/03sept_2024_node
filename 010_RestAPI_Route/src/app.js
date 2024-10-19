const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const PORT = process.env.PORT || 3000
const DBURL = process.env.DBURL


app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/tops").then(()=>{
    console.log("db connected")
}).catch(err=>{
    console.log(err);
    
})

app.use("/products",require("../router/productrouter"))
app.use("/categories",require("../router/categoryrouter"))
app.use("/users",require("../router/userrouter"))


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})