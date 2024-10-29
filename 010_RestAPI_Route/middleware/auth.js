const jwt = require("jsonwebtoken")
const User = require("../model/users")
const auth = async(req,resp,next)=>{

        try {
            
            const token =  req.header("auth-token")
            if(!token){
                return resp.status(401).send("Access denied. No token provided.")
            }

            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
         
            const user =  await User.findById(verified._id)
           
            
            req.user = user
            next()


        } catch (error) {
            return resp.status(401).send("Access denied. Invalid token.")
            
        }
        
}

module.exports = auth