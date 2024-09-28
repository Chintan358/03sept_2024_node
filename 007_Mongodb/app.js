const mongodb = require("mongodb")
const mongoClinet = mongodb.MongoClient



const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1"


mongoClinet.connect(url).then(data=>{

    const db = data.db("tops")

    // db.createCollection("emp").then(result=>{
    //     console.log("collection created...");
    // })

    // e1 = {name:"Krunal",email:"krunal@gmial.com",phone:9685748596,sal:15000}
    // db.collection("emp").insertOne(e1).then(result=>{
    //     console.log(result); 
    // })

    // e1 = {Name:"Nirmal",email:"nirmal@gmial.com",phone:99685635263,sal:25000}
    // e2 = {name:"Moksh",Email:"moksh@gmial.com",phone:90685635263,sal:35000}
    // e3 = {name:"Kajal",email:"kajal@gmial.com",phone:95685635263,Sal:27000}
    // db.collection("emp").insertMany([e1,e2,e3]).then(result=>{
    //     console.log(result); 
    // })


    // db.collection("emp").find().toArray().then(result=>{
    //     console.log(result);
    // })

    // db.collection("emp").find({name:"Krunal"}).toArray().then(result=>{
    //     console.log(result);
    // })

    // db.collection("emp").find({Name:"Nirmal"}).toArray().then(result=>{
    //     console.log(result);
    // })

    // db.collection("emp").deleteOne({name:'Krunal'}).then(result=>{
    //     console.log(result);
        
    // })

    
    // db.collection("emp").deleteMany({name:'Moksh'}).then(result=>{
    //     console.log(result);
    // })

    // db.collection("emp").updateOne({name:"Nirmal"},{$set:{email:'nirmal@yahoo.com',sal:3000}}).then(result=>{
    //     console.log(result);
    // })
    
    // db.collection("emp").updateMany({name:"Nirmal"},{$set:{email:'nirmal@yahoo.com',sal:3000}}).then(result=>{
    //     console.log(result);
    // })
    


    



    
}).catch(err=>{
    console.log(err);
    
})