const express = require("express")
const app = express()
const PORT = 3000


app.get("/",(req,resp)=>{
    resp.send("Home")
})

app.get("/about",(req,resp)=>{
    resp.send("About")
})

app.get("/contact",(req,resp)=>{
    resp.send("Contact")
})

app.get("/weather",(req,resp)=>{


    
    resp.send("weather data")
})

app.get("*",(req,resp)=>{
    resp.send("Rquest not found")
})






app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
    
})
