
const express = require("express")
const router = express.Router()
const User = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const Category = require("../model/categories")
const Product = require("../model/products")

router.get("/", (req, resp) => {
    resp.redirect("index")
})

router.get("/index", async (req, resp) => {

    try {

        const categories = await Category.aggregate([{
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products"
            }
        }])

        const products = await Product.find()
        resp.render("index", { categories: categories, products: products })
    } catch (error) {

    }

})

router.get("/shop", (req, resp) => {
    resp.render("shop")
})

router.get("/detail", (req, resp) => {
    resp.render("detail")
})

router.get("/contact", (req, resp) => {
    resp.render("contact")
})

router.get("/cart", auth, (req, resp) => {
    resp.render("cart")
})

router.get("/login", (req, resp) => {
    resp.render("login")
})

router.get("/reg", (req, resp) => {
    resp.render("reg")
})

router.post("/userreg", async (req, resp) => {

    try {
        const user = new User(req.body)
        const data = await user.save()
        resp.render("reg", { "msg": "Registration success !!!" })

    } catch (error) {
        console.log(error);

    }
})

router.post("/userlogin", async (req, resp) => {
    try {

        const user = await User.findOne({ email: req.body.email })

        isValid = await bcrypt.compare(req.body.pass, user.pass)

        if (isValid) {

            const token = await jwt.sign({ _id: user._id }, process.env.S_KEY)
            resp.cookie("token", token)
            resp.redirect("index")

        }
        else {
            resp.render("login", { "err": "Invalid credentials !!!" })
        }

    } catch (error) {
        resp.render("login", { "err": "Invalid credentials !!!" })
    }
})

router.get("/logout", auth, (req, resp) => {

    resp.clearCookie("token")
    resp.redirect("index")
})






module.exports = router