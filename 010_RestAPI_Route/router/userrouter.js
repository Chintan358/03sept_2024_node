const express = require("express")

const router = express.Router()

const User = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

router.get("/",auth,async (req,resp)=>{
    try {

        const users = await User.find()
        resp.send(users)
    } catch (error) {
        resp.send(error)
    }
})

router.post("/", auth,async (req,resp)=>{

    req.body.password = await bcrypt.hash(req.body.password,10)

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

router.post("/login",async(req,resp)=>{
    try {
        
        const user = await User.findOne({email:req.body.email})
        if(!user) return resp.status(400).send("Invalid email or password")

        const validPass = await bcrypt.compare(req.body.password,user.password)
        if(!validPass) return resp.status(400).send("Invalid email or password")

        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
        resp.send(`Welcome : ${user.name} your secret token for access all secure api is : auth-token -  ${token}`)

    } catch (error) {
        resp.send("Invalid email or password")
    }
   
})



module.exports=router