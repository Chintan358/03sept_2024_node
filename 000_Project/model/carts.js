const mongoose = require("mongoose")
const User = require("../model/users")
const Product = require("../model/products")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    qty: {
        type: Number
    }
})

module.exports = new mongoose.model("Cart", cartSchema)