const express = require("express")
const User = require("../model/users")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

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

router.get("/home",auth,async(req,resp)=>{
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

router.get("/login",(req,resp)=>{
    resp.render("login");
})

router.post("/userlogin",async(req,resp)=>{

    try {
        const user = await User.findOne({email:req.body.email})
        if(user){

            isValid = await bcrypt.compare(req.body.password,user.password)
            if(isValid)
            {
                // const token = await jwt.sign({_id:user._id},process.env.S_KEY)

                const token = await user.generateToken();
               
                resp.cookie("token",token)
                resp.redirect("home")
            }
            else
            {
                resp.render("login",{"err":"Invalid email or password"})
            }
           
        } else {
            resp.render("login",{"err":"Invalid email or password"})
        }
    } catch (error) {
        console.log(error);
        
        resp.render("login",{"err":"Something went wrong"})
    }})
        
   




module.exports = router