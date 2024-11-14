const express = require("express")
const User = require("../model/users")
const router = express.Router()

router.get("/",(req,resp)=>{
    resp.render("index")
})

router.post("/reg",async(req,resp)=>{
   
    try {
        const user = new User(req.body)
        await user.save()
        resp.render("index",{"msg":"Registration successfully !!!!"})
        
    } catch (error) {
       
        resp.render("index",{"err":"Something went wrong !!!!"})
    }
    
    
})

router.get("/home",async(req,resp)=>{
    try {
        const users = await User.find()
        resp.render("home",{"data":users})
    } catch (error) {
        
    }
})


module.exports = router