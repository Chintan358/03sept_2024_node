const express = require("express")

const router = express.Router()

const User = require("../model/users")


router.get("/", async (req,resp)=>{
    try {
        const users = await User.find()
        resp.send(users)
    } catch (error) {
        resp.send(error)
    }
})

router.post("/", async (req,resp)=>{
    const user = new User(req.body)
    try {
        const newUser = await user.save()
        resp.send(newUser)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id", async (req,resp)=>{  
    try {
        const user = await User.findById(req.params.id)
        if(!user) return resp.status(404).send("User not found")
        resp.send(user)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id", async (req,resp)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        if(!user) return resp.status(404).send("User not found")
        resp.send(user)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id", async (req,resp)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return resp.status(404).send("User not found")
        resp.send(user)
    } catch (error) {
        resp.send(error)
    }
})



module.exports=router