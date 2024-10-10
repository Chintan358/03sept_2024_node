const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema({
    pname : {
        type:String
    },
    price : {
        type  :Number
    },
    qty : {
        type : Number
    }
})

const Product = mongoose.model("Product",ProductSchema)

module.exports = Product