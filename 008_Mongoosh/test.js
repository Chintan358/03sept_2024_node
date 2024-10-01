const mongoose = require("mongoose")

const url = "mongodb://127.0.0.1:27017/tops"

mongoose.connect(url).then(()=>{
    console.log("db connected...");
    
}).catch(err=>{
    console.log(err);
})


const productSchema = new mongoose.Schema({

        pname : { 
            type : String,
            unique : true,
            // enum : {
            //     values : ['Fan','Pen']
            // }
            trim:true
        },
        price : {
            type : Number
        },
        qty : {
            type : Number,
            required : true
        },
        status : {
            type : Boolean
        }

})

const Product = new mongoose.model("Product",productSchema)

const addProduct= async ()=>{
    try {
        p = new Product({pname:" Pen",price:300,qty:10,status:true})
        const result = await p.save()
        console.log(result);
        
    } catch (error) {
        console.log(error);
        
    }
}

addProduct()
