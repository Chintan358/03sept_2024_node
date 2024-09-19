const axios = require("axios")

lat = 22.1702
lon = 73.8311

// const Weatherdata = (lat,lng,callback)=>{

// const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=1b274b6a8139a5eeae5571f298f7258e&units=metric`

// axios.get(URL).then(result=>{
//     const data = result.data.main;

//     const Temp = data.temp 
//     const Pressure = data.pressure
//     const Humidity = data.humidity
//     const City = result.data.name
    
//     // console.log(`
        
//     //     City : ${City}
//     //     Temp : ${Temp}
//     //     Pressure : ${Pressure}
//     //     Humidity : ${Humidity}
        
        
//     //     `);

//     callback({Temp,Pressure,Humidity,City})
    
    
// }).catch(err=>{
//     console.log(err); 
// })

// }


const Weatherdata = (lat,lng)=>{


    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=1b274b6a8139a5eeae5571f298f7258e&units=metric`
    
    return new Promise((resolve,reject)=>{
        axios.get(URL).then(result=>{
            const data = result.data.main;
        
            const Temp = data.temp 
            const Pressure = data.pressure
            const Humidity = data.humidity
            const City = result.data.name
            
            resolve({Temp,Pressure,Humidity,City})
            
            
        }).catch(err=>{
           reject(err)
        })
        
    })

    
    }

module.exports={Weatherdata}