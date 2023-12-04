const express = require("express")
require("dotenv").config()
const {connection} = require("./db")
const {contactRouter} = require("./Route/contactRoute")
const cors = require("cors")
const app= express()

app.use(cors())
app.use(express.json())
app.get("/", (req,res)=>{
    res.send("hello")
})

app.use("/contact", contactRouter)

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("server is running")
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
   
})