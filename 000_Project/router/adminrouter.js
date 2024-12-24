const router = require("express").Router()
const Admin = require("../model/admins")
const jwt = require("jsonwebtoken")
const aauth = require("../middleware/adminauth")
const User = require("../model/users")
const Category = require("../model/categories")
const Product = require("../model/products")
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/product_images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now() + ".jpg");
    }
});

const upload = multer({
    storage: storage,
})


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


//****************user start**************** */

router.get("/users", async (req, resp) => {
    try {
        const users = await User.find()
        resp.render("users", { "users": users })
    } catch (error) {
        console.log(error);

    }
})



//***********user end******************** */

//**********Category start***************** */
router.get("/categories", async (req, resp) => {
    try {

        const categories = await Category.find()
        resp.render("category", { "categories": categories })
    } catch (error) {
        console.log(error);

    }
})

router.post("/addCategory", async (req, resp) => {


    try {

        const catid = req.body.catid
        console.log(catid);

        if (catid != "") {
            await Category.findByIdAndUpdate(catid, req.body)
            resp.redirect("categories")
        }
        else {
            const category = new Category(req.body)
            await category.save()
            resp.redirect("categories")
        }
    } catch (error) {
        console.log(error);

    }
})

router.get("/deleteCategory", async (req, resp) => {
    try {
        await Category.findByIdAndDelete(req.query.catid)
        resp.redirect("categories")
    } catch (error) {
        console.log(error);
    }
})

router.get("/editCategory", async (req, resp) => {
    try {
        const category = await Category.findOne({ _id: req.query.catid })
        const categories = await Category.find()

        resp.render("category", { category: category, "categories": categories })
    } catch (error) {
        console.log(error);
    }
})

//*******************category end******************** */


//*************product start ******************* */
router.get("/products", async (req, resp) => {
    try {

        const categories = await Category.find()
        const products = await Product.find().populate("category");

        console.log(products);



        resp.render("product", { categories: categories, products: products })
    } catch (error) {


    }
})

router.post("/addproducts", upload.single("file"), async (req, resp) => {
    console.log(req.body);
    console.log(req.file.filename);


    try {
        const product = new Product({ category: req.body.category, productName: req.body.productname, price: req.body.price, qty: req.body.qty, Image: req.file.filename })
        await product.save()
        resp.redirect('products')
    } catch (error) {
        console.log(error);

    }
})


router.get("/deleteProduct", async (req, resp) => {
    try {
        const deletedProd = await Product.findByIdAndDelete(req.query.pid)

        resp.redirect("products")
    } catch (error) {

    }
})

//*************product end*************** */

router.get("/orders", async (req, resp) => {
    try {
        resp.render("order")
    } catch (error) {

    }
})






module.exports = router