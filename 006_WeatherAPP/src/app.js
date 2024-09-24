const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const PORT = 3000
const geocode = require("../util/Geocode")
const weather = require("../util/Weather")

const viewPath = path.join(__dirname,"../Templates/views")
const partialPath = path.join(__dirname,"../Templates/partials")
const publicPath = path.join(__dirname,"../public")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))

app.get("/",(req,resp)=>{
    resp.render("index")
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



app.listen(PORT,()=>{
    console.log(`server runnin on port ${PORT}`);
    
})