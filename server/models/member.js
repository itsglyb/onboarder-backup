const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema ({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
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
    userType:{
        type: String,
        default : "member"
    },

    dateCreated:{
        type: Date,
        default :Date,
    
    }
})

module.exports = mongoose.model("Member", memberSchema)