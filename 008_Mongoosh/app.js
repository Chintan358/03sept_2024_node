const mongoose = require("mongoose")

const url = "mongodb://127.0.0.1:27017/tops"

mongoose.connect(url).then(()=>{
    console.log("db connected...");
    
}).catch(err=>{
    console.log(err);
})

const userSchema = new mongoose.Schema({
    name : {
        type:String
    },
    email : {
        type:String
    },
    age : {
        type :Number
    },
    Dob : {
        type : Date
    }
})

const User = new mongoose.model("User",userSchema)

const addUser = ()=>{

    const u = new User({Name:"test",email:"test@gmail.com",age:25})
    u.save().then(r=>{
        console.log(r);
        
    })
}


addUser()