const mongoose = require('mongoose')
const Organization = require('./organization');

const eventsSchema = new mongoose.Schema ({

    orgID: {
        type: mongoose.Schema.ObjectId, 
        ref: "Organization"
    },
    orgName: {
        type: String,
        ref: "Organization"
    },
    eventTitle: {
        type: String
    },
    eventDesc: {
        type: String
    },
    eventDate: {
        type: String
    },
    eventTime: {
        type: String
    },
    location: {
        type: String
    },
    meetingURL: {
        type: String
    },
    poster: {
        type: String
    },
    programme: {
        type: String
    },
    video: {
        type: String
    },
    eventSeats: {
        type: String
    },
    eventPrice: {
        type: String
    },
    eventPaymentDetails: {
        type: String
    }
})

module.exports = mongoose.model("Events", eventsSchema)
