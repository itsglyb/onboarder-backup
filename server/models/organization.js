const { encodeBase64 } = require('bcryptjs')
const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema ({

    orgName:{
        type: String,
        required: true,
    
    },
    orgType:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },

    about:{
        type: String,
        required: true
    },
    orgHistory:{
        type: String,
        required: true
    },
    mission:{
        type: String,
    
    },
    vision:{
        type: String,
    },
    coreValues:{
        type: String,
    },
    userType:{
        type: String,
        default : "organization",
    },  
    dateCreated:{
        type: Date,
        default :Date,
    },
    logo: {
        type: String
    },
    orgCode: {
        type: String
    }

})

module.exports = mongoose.model("Organization", organizationSchema)