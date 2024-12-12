const router = require("express").Router()


router.get("/admin", (req, resp) => {
    resp.render("adminlogin")
})

router.get("/dashboard", (req, resp) => {
    resp.render("dashboard")
})

module.exports = router