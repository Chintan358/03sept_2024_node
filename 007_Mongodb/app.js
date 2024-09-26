const mongodb = require("mongodb")
const mongoClinet = mongodb.MongoClient



const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1"


mongoClinet.connect(url).then(data=>{
    console.log("db connected");

    const db = data.db("tops")

    db.createCollection("emp").then(result=>{
        console.log("collection created...");
        
    })

    
})