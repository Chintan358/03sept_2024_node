const jwt = require("jsonwebtoken")

// secret key for signing JWT

const SECRET_KEY = "myfirstjsonwebtoken"

// function to generate JWT

async function generateToken(payload) {

    const token = await jwt.sign(payload, SECRET_KEY)
    //console.log(token);
    const dt =  await jwt.verify(token,"fdfd")
    console.log(dt);
    

}

generateToken({name:"Niraml",email:"nirmal@gmail.com"})