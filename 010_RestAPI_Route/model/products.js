const mongoose = require("mongoose")
const Category = require("../model/categories")

const ProductSchema = new mongoose.Schema({
    pname : {
        type:String
    },
    price : {
        type  :Number
    },
    qty : {
        type : Number
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Category
    }
})

const Product = mongoose.model("Product",ProductSchema)

module.exports = Product