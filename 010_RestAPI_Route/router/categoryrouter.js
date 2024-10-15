const express = require("express")

const router = express.Router()
const Category = require("../model/categories")

router.get("/",async(req,resp)=>{
    try {
        const categories = await Category.find()
        resp.send(categories)
    } catch (error) {
        resp.send(error)
    }
})

router.post("/",async(req,resp)=>{
    const category = new Category(req.body)
    try {
        const newCategory = await category.save()
        resp.send(newCategory)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id",async(req,resp)=>{
    try {
        const category = await Category.findById(req.params.id)
        if(!category) return resp.status(404).send("Category not found")
        resp.send(category)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id",async(req,resp)=>{
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,req.body)
        if(!category) return resp.status(404).send("Category not found")
        resp.send(category)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id",async(req,resp)=>{ 
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if(!category) return resp.status(404).send("Category not found")
        resp.send(category)
    } catch (error) {
        resp.send(error)
    }
})



module.exports=router