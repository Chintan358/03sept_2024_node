const mongoose   =require("mongoose")
const Product = require("../model/products")
const User = require("../model/users")

const cartSchema = new mongoose.Schema({
    products : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    users : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    qty : {
        type : Number
    }
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart