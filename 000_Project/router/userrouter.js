
const express = require("express")
const router = express.Router()

router.get("/", (req, resp) => {
    resp.redirect("index")
})

router.get("/index", (req, resp) => {
    resp.render("index")
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

router.get("/cart", (req, resp) => {
    resp.render("cart")
})

router.get("/login", (req, resp) => {
    resp.render("login")
})

router.get("/reg", (req, resp) => {
    resp.render("reg")
})








module.exports = router