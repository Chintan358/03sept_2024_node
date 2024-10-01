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

const addManyUsers = async ()=>{

    u1 = new User({name:"Kajal",email:"kajal@gmail.com",age:22})
    u2 = new User({name:"Nidhi",email:"nidhi@gmail.com",age:22})
    // User.insertMany([u1,u2]).then(result=>{
    //     console.log(result);
        
    // }).catch(err=>{
    //     console.log(err);
        
    // })   
    try {
        const result = await User.insertMany([u1,u2])
        console.log(result);
        
    } catch (error) {
        console.log(error);
        
    }
}

const viewUser = async ()=>{
    try {
        const u =await User.find()
        console.log(u);
    } catch (error) {
        
    }
}



// addUser()
// addManyUsers()
viewUser()