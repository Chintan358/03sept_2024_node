
const jwt = require("jsonwebtoken")
const auth =async (req,resp,next)=>{

    const token = req.cookies.token
    
    try {
        const user  =  await jwt.verify(token,process.env.S_KEY)

        if(user)
        {
            next()
        }

    } catch (error) {
        resp.render("login",{"err":"Please login first !!!"})
    }
    
}

module.exports=auth