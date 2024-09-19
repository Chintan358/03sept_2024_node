
const fs = require("fs")


// fs.writeFileSync("data.txt","this is first node practical")

// fs.writeFile("home.txt","home page",(err)=>{
//     console.log("File creted")
// })


// const data =  fs.readFileSync("data.txt","utf-8")
// console.log(data);
// console.log("something after data....");

fs.readFile("data.txt","utf-8",(err,data)=>{
    console.log(data);
})
console.log("something after data....");


