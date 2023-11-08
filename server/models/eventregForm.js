const mongoose = require('mongoose')
const Events = require('./events');
const Member = require('./member')

const eventregFormSchema = new mongoose.Schema({
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
    memID: {
        type: mongoose.Schema.ObjectId,
        ref: "Member"
    },
    memName: {
        type: String
    },
    memType: {
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

module.exports = mongoose.model("eventRegForm", eventregFormSchema)