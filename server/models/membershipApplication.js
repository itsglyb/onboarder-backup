const mongoose = require('mongoose')
const MemForm = require('./membershipForm')
const Member = require('./member')
const Organization = require('./organization')


const membershipApplicatioSchema = new mongoose.Schema ({

    orgID:{
        type: mongoose.Schema.ObjectId, 
        ref: "Organization"
    },

    memID:{
        type: mongoose.Schema.ObjectId, 
        ref: "Member"
    },

    isRejected:{
      type:Boolean,
      default: false,
    },

    isVerified:{
        type: Boolean, 
        default : false,
    },

    remarks:{
      type: String,
    },

    dateCreated:{
        type: Date,
        default :Date,
    
    },

    photo: {
      type: String,
  },

    fullName: {
        type: String,
    },
    sex: {
        type: String,
    },
    birthDate: {
        type: String,
    },
    placeOfBirth : {
        type: String,
    },
    civilStatus: {
        type: String,
    },
    religion: {
        type: String,
    },
    address: {
        type: String,
    },
    zip: {
        type: String,
    },
    email: {
        type: String,
    },
    contactNum: {
        type: String,
    },
    facebook: {
        type: String,
    },
      linkedIn: {
        type: String,
      },
      skype: {
        type: String,
      },
      zoom: {
        type: String,
      },
      prcNo : {
        type: String,
      },
      prcDate: {
        type: String,
      },
      prcExpiration: {
        type: String,
      },
      studentID: {
        type: String,
      },
      aviation: {
        type: String,
      },
      caap: {
        type: String,
      },
      taxID: {
        type: String,
      },
      tertiary: {
        type: String,
      },
      tertiaryDegree: {
        type: String,
      },
      tertiaryYear: {
        type: String,
      },
      tertiaryDiploma : {
       type: String,
      },
      masteral: {
        type: String,
      },
      masteralDegree: {
        type: String,
      },
      masteralYear: {
        type: String,
      },
     masteralDiploma: {
       type: String,
    },
      doctoral: {
        type: String,
      },
      doctoralDegree: {
        type: String,
      },
      doctoralYear: {
        type: String,
      },
      doctoralDiploma: {
         type: String,
      },
      employer: {
        type: String,
      },
      jobTitle: {
        type: String,
      },
      employerAdd: {
        type: String,
      },
      chooseMem: {
        type: String,
      },
      payment: {
        type: String,
    },
   
})

module.exports = mongoose.model("MembershipApplication", membershipApplicatioSchema)