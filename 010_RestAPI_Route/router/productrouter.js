const express = require("express")
const { models } = require("mongoose")
const router = express.Router()


router.get("/products",(req,resp)=>{
    resp.send("All products")
})

module.exports=router