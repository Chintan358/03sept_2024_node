const express = require("express")
const app = express()
const PORT = 3000
const Razorpay = require("razorpay")



app.get("/",(req,resp)=>{
    resp.sendFile(__dirname+"/index.html")
})

app.get("/payment",(req,resp)=>{

    const amt =  Number(req.query.amt)
   
    
    var instance = new Razorpay({
        key_id: 'rzp_test_9i2ehhzfi6wVzA',
        key_secret: '829D6edUREQeGbM2ykIqeq5F',
      });

      var options = {
        amount: amt*100 ,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };

      instance.orders.create(options, function(err, order) {
      resp.send(order)
      
      });




})


app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})