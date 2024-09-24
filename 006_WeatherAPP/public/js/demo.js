



var headers = new Headers();
headers.append("X-CSCAPI-KEY", "TnhkcGRwNDR5NEdQcWFZd2xGMXhJT3FKbnBGSXBzVW1MT0o5a0tESA==");

var requestOptions = {
method: 'GET',    
headers: headers,
redirect: 'follow'
};


const getCountries = ()=>{

   
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.json())
    .then(result =>{

        var options = "<option value='0'>---Select  Country---</option>"
        result.map(ele=>{
           
            
            
           options+=`<option value=${ele.iso2}>${ele.name}</option>`
            
        })

        countrylist.innerHTML=options
        

    })
    .catch(error => console.log('error', error));



}

var code;

const getStates = (countryCode)=>{
    code = countryCode
    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions)
  .then(response => response.json())
  .then(result => {
    var options = "<option value='0'>---Select  State---</option>"
        result.map(ele=>{
           
            
            
           options+=`<option value=${ele.iso2}>${ele.name}</option>`
            
        })

        statelist.innerHTML=options
  })
  .catch(error => console.log('error', error));

}

var scode;

const getCities = (stateCode)=>{
    scode=stateCode
    fetch(`https://api.countrystatecity.in/v1/countries/${code}/states/${stateCode}/cities`, requestOptions)
  .then(response => response.json())
  .then(result =>{

    var options = "<option value='0'>---Select  city---</option>"
    result.map(ele=>{
       
        
        console.log(ele);
        
       options+=`<option value=${ele.name}>${ele.name}</option>`
        
    })

    citylist.innerHTML=options



  })
  .catch(error => console.log('error', error));
}



const weatherdata = (city)=>{
    
    const location =city+","+scode+","+code
   
    
    fetch(`/weather?city=${location}`).then(data=>{
        return data.json()
    }).then(result=>{
        
        cityname.innerHTML=result.City
        temp.innerHTML=result.Temp
        pressure.innerHTML=result.Pressure
        humidity.innerHTML=result.Humidity
        lat.innerHTML=result.Lat
        lng.innerHTML=result.Lng
        
        
    }).catch(err=>{
        console.log(err);
        
    })

}