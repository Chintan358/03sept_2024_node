const geocode  =require("./Geocode")
const weather = require("./Weather")

const city = process.argv[2];
if(!city)
{
    console.log("City name is required !!!");
    
    return
}

// geocode.Geocodedata(city,(data,err)=>{

//     weather.Weatherdata(data.lat,data.lng,(result)=>{
        
//         console.log(`
            
//             City : ${result.City}
//             Lat : ${data.lat}
//             Lng : ${data.lng}
//             Temp : ${result.Temp}
//             Pressure : ${result.Pressure}
//             Humidity : ${result.Humidity}

            
//             `);
        
        
//     })
   
    
// })

geocode.Geocodedata(city).then(data=>{
    
    weather.Weatherdata(data.lat,data.lng).then(result=>{
        console.log(`
            
                        City : ${result.City}
                        Lat : ${data.lat}
                        Lng : ${data.lng}
                        Temp : ${result.Temp}
                        Pressure : ${result.Pressure}
                        Humidity : ${result.Humidity}
            
                        
                        `);
    })
    
}).catch(err=>{
    console.log(err);
    
})