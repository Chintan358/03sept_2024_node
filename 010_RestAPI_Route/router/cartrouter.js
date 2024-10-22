const express = require("express")
const router = express.Router()

const Cart = require("../model/carts")

router.post("/",async(req,resp)=>{

    try {
        const cart = new Cart(req.body)
        const data = await cart.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id",async(req,resp)=>{

    try {
        const cart = await Cart.findById(req.params.id)
        if(!cart) return resp.status(404).send("Cart not found")
        resp.send(cart)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/",async(req,resp)=>{
    try {
        const carts = await Cart.find().populate("products").populate("users")
        resp.send(carts)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/users/:id",async(req,resp)=>{
    try {
        const carts = await Cart.find({users:req.params.id}).populate("products").populate("users")
        resp.send(carts)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id",async(req,resp)=>{
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id,req.body)
        if(!cart) return resp.status(404).send("Cart not found")
        resp.send(cart)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id",async(req,resp)=>{
        try {
            const cart = await Cart.findByIdAndDelete(req.params.id)
            if(!cart) return resp.status(404).send("Cart not found")
            resp.send(cart)
        } catch (error) {
            resp.send(error)
        }
})


module.exports = router