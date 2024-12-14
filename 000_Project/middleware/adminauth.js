
const jwt = require("jsonwebtoken")
const Admin = require("../model/admins")
const auth = async (req, resp, next) => {

    const token = req.cookies.admintoken

    try {
        const admin = await jwt.verify(token, process.env.S_KEY)

        const CurrentUser = await Admin.findById(admin._id)


        if (admin) {
            req.admin = CurrentUser
            req.token = token
            next()
        }
        else {
            resp.render("adminlogin", { "err": "Please login first !!!" })
        }

    } catch (error) {


        resp.render("adminlogin", { "err": "Please login first !!!" })
    }

}

module.exports = auth