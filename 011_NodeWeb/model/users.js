const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    Tokens : [
        {
            token : {
                type : String,
            }
        }
    ]

})

userSchema.pre("save",async function(){
   
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password, 10)
    }
})

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.S_KEY)
    this.Tokens =  this.Tokens.concat({token:token})
    this.save()
    return token
}




module.exports = mongoose.model("User", userSchema)


