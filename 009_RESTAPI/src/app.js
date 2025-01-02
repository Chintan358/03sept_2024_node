const express = require("express")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT
const DBURL = process.env.DBURL

const mongoose = require("mongoose")

app.use(express.json())

mongoose.connect(DBURL).then(() => {
    console.log("DB connected...");
}).catch(err => {
    console.log(err);

})


const empSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    salary: {
        type: Number
    }
})

const Employee = new mongoose.model("Emplyee", empSchema)




app.get("/employees", async (req, resp) => {

    try {

        const employees = await Employee.find()
        resp.send(employees)

    } catch (error) {
        resp.send(error)
    }


})

app.post("/employees", async (req, resp) => {

    console.log(req.body);

    try {
        const p1 = new Employee(req.body)
        const data = await p1.save();
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }


})

app.put("/employees", async (req, resp) => {

    try {
        const data = await Employee.findByIdAndUpdate(req.query.id, req.body)
        resp.send(data)

    } catch (error) {
        resp.send

    }

})

app.delete("/employees", async (req, resp) => {

    try {
        const data = await Employee.findByIdAndDelete(req.query.id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})






app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
})