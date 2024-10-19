const bcrypt = require("bcryptjs")

const hashPass = async (pass)=>{
   const bpass =  await bcrypt.hash(pass,10)
   console.log(bpass);
   
   const isMatch = await bcrypt.compare("123",bpass)
   console.log(isMatch);
   
}

hashPass("123")