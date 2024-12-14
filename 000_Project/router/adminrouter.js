const router = require("express").Router()
const Admin = require("../model/admins")
const jwt = require("jsonwebtoken")
const aauth = require("../middleware/adminauth")

router.get("/admin", (req, resp) => {
    resp.render("adminlogin")
})

router.get("/dashboard", aauth, (req, resp) => {
    resp.render("dashboard")
})

router.post("/adminlogin", async (req, resp) => {

    try {

        const admin = await Admin.findOne({ email: req.body.email })

        if (admin) {
            if (admin.pass == req.body.pass) {


                const token = await jwt.sign({ _id: admin._id }, process.env.S_KEY)
                resp.cookie("admintoken", token)
                resp.redirect("dashboard")
            }
            else {
                resp.render("adminlogin", { "err": "Invalid credentials" })
            }
        }
        else {
            resp.render("adminlogin", { "err": "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);

        resp.render("adminlogin", { "err": "Invalid credentials" })
    }

})

router.get("/adminlogout", async (req, resp) => {

    resp.clearCookie("admintoken")
    resp.render("adminlogin")
})

router.get("/users", async (req, resp) => {
    try {
        resp.render("users")
    } catch (error) {

    }
})

router.get("/categories", async (req, resp) => {
    try {
        resp.render("category")
    } catch (error) {

    }
})

router.get("/products", async (req, resp) => {
    try {
        resp.render("product")
    } catch (error) {

    }
})

router.get("/orders", async (req, resp) => {
    try {
        resp.render("order")
    } catch (error) {

    }
})




module.exports = router