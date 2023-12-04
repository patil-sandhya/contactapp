const {ContactModel} = require("../Module/contactModel")
const express = require("express")
const contactRouter = express.Router()

contactRouter.post("/contacts", async(req,res)=>{
    const {name,email,phone,lable,booked_slots} = req.body
    try {
        let newContact = new ContactModel({
            name,email,phone,lable,booked_slots
        })
        await newContact.save()
        res.send({"msg": "New Contact is Added", newContact: req.body})
    } catch (error) {
        res.send(err)
    }

})

contactRouter.get("/contacts/:username", async(req,res)=>{
    const {username} = req.params
    try {
    const user = await ContactModel.find({name: username})
    console.log(user)
       if(user){
        res.send({"userList": user})
       }else{
        res.send({"mag": "Contact does not exist"})
       }
    } catch (error) {
        res.send(error)
    }

})

contactRouter.get("/contacts", async(req,res)=>{
   
    try {
    const user = await ContactModel.find()
    console.log(user)
       if(user){
        res.send({"list": user})
       }else{
        res.send({"mag": "Contact does not exist"})
       }
    } catch (error) {
        res.send(error)
    }

})

contactRouter.patch("/update/:id", async(req,res)=>{
    const {id} = req.params
    const cur = await ContactModel.findOne({_id: id})
    try {
        if(cur != null){
            await ContactModel.findByIdAndUpdate({_id:id}, req.body)
            res.status(200).send({"msg" : "Contact is updated"})
        }else{
            res.status(400).send({"msg" : "Contact does not exist"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg" : "Contact does not exist"})
    }
})

contactRouter.delete("/delete/:id", async(req,res)=>{
    const {id} = req.params
    const cur = await ContactModel.findOne({_id: id})
    try {
        if(cur != null){
            await ContactModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg" : "Contact is deleted"})
        }else{
            res.status(400).send({"msg" : "Contact does not exist"})
        }
    } catch (error) {
        console.log(error)
       // res.status(400).send({"msg" : "Server error try it after some time"})
    }
})
module.exports = {
    contactRouter
}