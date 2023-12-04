const mongoose = require("mongoose")

const contactSchema= mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    lable: String,
    booked_slots: Array
})

const ContactModel = mongoose.model("contact",contactSchema)
module.exports = {
    ContactModel
}