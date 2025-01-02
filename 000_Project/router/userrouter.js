
const express = require("express")
const router = express.Router()
const User = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const Category = require("../model/categories")
const Product = require("../model/products")
const Razorpay = require("razorpay")
const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chintan.tops@gmail.com',
        pass: 'dejl icyq qrel gyyf'
    }
});


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

//**********************cart********************* */
const Cart = require("../model/carts")
router.get("/cart", auth, async (req, resp) => {

    try {
        const cartdata = await Cart.find({ user: req.user._id }).populate("product")

        var sum = 0
        cartdata.map(ele => {
            sum = sum + (ele.product.price * ele.qty);
        })

        const totalItem = cartdata.length

        resp.render("cart", { cartdata: cartdata, sum: sum, totalItem: totalItem })
    } catch (error) {

    }

})

router.get("/addtocart", auth, async (req, resp) => {


    try {

        pid = req.query.pid
        uid = req.user._id

        const exists = await Cart.find({ user: uid, product: pid })
        if (exists.length == 0) {
            const cart = new Cart({ user: uid, product: pid, qty: 1 })
            await cart.save()
            resp.send("Product added to cart")
        }
        else {
            resp.send("Product alredy exist in cart!!!")
        }



    } catch (error) {
        console.log(error);

    }
})


router.get("/removecart", auth, async (req, resp) => {
    try {
        await Cart.findByIdAndDelete(req.query.cartid)
        resp.send("Product removed from cart!!!")
    } catch (error) {
        console.log(error);

    }
})

router.get("/changeQty", async (req, resp) => {
    try {

        const cartdata = await Cart.findById(req.query.cartid)
        const newQty = cartdata.qty + Number(req.query.qty)
        if (newQty <= 0) {
            return
        }
        await Cart.findByIdAndUpdate(req.query.cartid, { qty: newQty })

        resp.send("qty updated")
    } catch (error) {
        console.log(error);

    }
})


router.get("/payment", (req, resp) => {

    const amt = Number(req.query.amt)


    var instance = new Razorpay({
        key_id: 'rzp_test_9i2ehhzfi6wVzA',
        key_secret: '829D6edUREQeGbM2ykIqeq5F',
    });

    var options = {
        amount: amt * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    instance.orders.create(options, function (err, order) {

        resp.send(order)


    });

})

//****************************************** */
const Order = require("../model/orders")
// const { default: customers } = require("razorpay/dist/types/customers")
router.get("/createorder", auth, async (req, resp) => {


    try {
        const payid = req.query.pid
        const uid = req.user._id
        const cartdata = await Cart.find({ user: uid }).populate("product")

        currentProducts = []
        var rows = ""
        var id = 1
        var total = 0
        cartdata.map(data => {
            p = {
                name: data.product.productName,
                price: data.product.price,
                qty: data.qty
            }
            var subtotal = data.qty * data.product.price
            total += subtotal
            rows += "<tr><td>" + id + "</td><td>" + data.product.productName + "</td><td>" + data.product.price + "</td><td>" + data.product.qty + "</td><td>" + subtotal + "</td></tr>"
            currentProducts.push(p)
            id++;
        })

        const order = new Order({ user: uid, payid: payid, products: currentProducts })
        await order.save()
        await Cart.deleteMany({ user: uid })

        var mailOptions = {
            from: 'chintan.tops@gmail.com',
            to: req.user.email,
            subject: 'Order Confimation !!!',
            html: "<table border='1'><tr><th>ID</th><th>Product Name</th><th>Price</th><th>Qty</th><th>Total</th></tr>" + rows + "<tr><td colspan='4'>Total</td><td>" + total + "</td></tr></table>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                resp.send("Order created")
            }
        });

    } catch (error) {
        console.log(error);

    }
})
module.exports = router