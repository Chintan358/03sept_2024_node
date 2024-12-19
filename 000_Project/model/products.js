const mongoose = require("mongoose")
const Category = require("../model/categories")
const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category
    },
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
    Image: {
        type: String
    }
})

module.exports = new mongoose.model("Product", productSchema)