const mongoose = require('mongoose')

const memberTokenSchema = new mongoose.Schema ({

    memID:{
        type: mongoose.Schema.ObjectId, 
        ref: "Member"
    },
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 3000,
    }
})

module.exports = mongoose.model("MemberToken", memberTokenSchema)