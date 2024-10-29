const express = require("express")
const router = express.Router()

const Cart = require("../model/carts")
const auth = require("../middleware/auth")
router.post("/",auth,async(req,resp)=>{

    const user =  req.user;
    //console.log(user);
    

    try {
        const cart = new Cart({products:req.body.products,qty : req.body.qty,users:user._id})
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

router.get("/",auth,async(req,resp)=>{
    try {
        const carts = await Cart.find().populate("products").populate("users")
        resp.send(carts)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/users/id",auth,async(req,resp)=>{
    console.log("user calling...");
    
    const user = req.user
 
    
    try {
        const carts = await Cart.find({users:user._id}).populate("products").populate("users")
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