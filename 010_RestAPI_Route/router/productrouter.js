const express = require("express")
const router = express.Router()
const Product = require("../model/products")

router.get("/",async(req,resp)=>{
   
    try {
        const products = await Product.find().populate('category')
        resp.send(products)
    } catch (error) {
        resp.send(error)
    }
})

router.post("/",async(req,resp)=>{
  
    try {
        const p1 = new Product(req.body)
        const data = await p1.save();
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id",async(req,resp)=>{
    try {
        const product = await Product.findById(req.params.id)
        resp.send(product)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id",async(req,resp)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        resp.send(product)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id",async(req,resp)=>{ 

    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        resp.send(product)
    } catch (error) {
        resp.send(error)
    }
})





module.exports=router