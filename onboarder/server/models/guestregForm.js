const mongoose = require('mongoose')
const Events = require('./events');


const guestregFormSchema = new mongoose.Schema({
    orgID: {
        type: mongoose.Schema.ObjectId,
        ref: "Events"
    },
    orgName: {
        type: String,
        ref: "Events"
    },
    eventID: {
        type: mongoose.Schema.ObjectId,
        ref: "Events"
    },
    guestName: {
        type: String
    },
    proofofPayment: {
        type: String
    },
    emailAddress: {
        type: String
    },
    contactno: {
        type: String
    }
})

module.exports = mongoose.model("GuestRegForm", guestregFormSchema)