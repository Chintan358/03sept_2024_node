const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName  :{
        type:String
    }
})

module.exports=new mongoose.model("Category",categorySchema)