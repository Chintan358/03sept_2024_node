const express = require("express")
const app = express()
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3000
const DBURL = process.env.DBURL
console.log(DBURL);

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/tops").then(()=>{
    console.log("db connected")
}).catch(err=>{
    console.log(err);
    
})

app.use("/",require("../router/productrouter"))


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})