const mongoose = require("mongoose")
const User = require("../model/users")
const Product = require("../model/products")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    products: [
        {
            name: {
                type: String
            },
            price: {
                type: Number
            },
            qty: {
                type: Number
            }
        }
    ],
    payid: {
        type: String
    }
})

module.exports = new mongoose.model("Order", orderSchema)