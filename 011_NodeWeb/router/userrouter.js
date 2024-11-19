const express = require("express")
const User = require("../model/users")
const router = express.Router()

router.get("/",(req,resp)=>{
    resp.render("index")
})

router.post("/reg",async(req,resp)=>{
   
    try {

        id = req.body.id;

        if(id){
            const user = await User.findByIdAndUpdate(id,req.body)
            resp.render("index",{"msg":"Update successfully !!!!"})
        } else {

        const user = new User(req.body)
        await user.save()
        resp.render("index",{"msg":"Registration successfully !!!!"})
        }
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

router.get("/delete",async(req,resp)=>{
   
    const id =  req.query.id
    try {
        const dt = await User.findByIdAndDelete(id)
        resp.redirect("home")
    } catch (error) {
        
    }
    
    
})

router.get("/update",async(req,resp)=>{
    const id =  req.query.id
    try {
        const user = await User.findById(id)
        resp.render("index",{"data":user})
    } catch (error) {
        
    }
})


module.exports = router