const express = require("express")
const app = express()
const PORT = 3000

const geocode = require("./Geocode")
const weather = require("./Weather")


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

    const city = req.query.city
    geocode.Geocodedata(city).then(data=>{
    
        weather.Weatherdata(data.lat,data.lng).then(result=>{
            resp.send({
                
                            City : result.City,
                            Lat : data.lat,
                            Lng : data.lng,
                            Temp : result.Temp,
                            Pressure : result.Pressure,
                            Humidity : result.Humidity
                
                            
        });
        })
        
    }).catch(err=>{
        console.log(err);
        
    })

    
})

app.get("*",(req,resp)=>{
    resp.send("Rquest not found")
})






app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
    
})
