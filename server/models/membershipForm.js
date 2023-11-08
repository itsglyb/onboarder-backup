const mongoose = require('mongoose')
const Organization = require('./organization');


const membershipFormSchema = new mongoose.Schema ({

    dateCreated:{
        type: Date,
        default :Date,
    
    },

    orgID:{
        type: mongoose.Schema.ObjectId, 
        ref: "Organization"
    },

    photo:{
        type: Boolean,
    },

    personalInfo:{
        type: Boolean,
    },

    fullName:{
        type: Boolean,
    },

    sex:{
        type: Boolean,

    },
    
    birthDate:{
        type: Boolean,
    },

    civilStatus:{
        type: Boolean,
    },
    religion:{
        type: Boolean,
    },

    placeOfBirth:{
        type: Boolean,
    },
    
    zip:{
        type: Boolean,
    },

    email:{
        type: Boolean,
    },

    contactNum:{
        type: Boolean,
    },

    address:{
        type: Boolean,
    },
    
    facebook:{
        type: Boolean,
    },

    skype:{
        type: Boolean,
    },

    linkedIn:{
        type: Boolean,
    },

    zoom:{
        type: Boolean,
    },

    idLicense:{
        type: Boolean,
    },

    prcNo:{
        type: Boolean,
    },

    prcDate:{
        type: Boolean,
    },

    prcExpiration:{
        type: Boolean,
    },

    studentID:{
        type: Boolean,
    },

    aviation:{
        type: Boolean,
    },

    caap:{
        type: Boolean,
    },

    taxID:{
        type: Boolean,
    },

    EducAttainment:{
        type: Boolean,
    },

    tertiary:{
        type: Boolean,
    },

    tertiaryDegree:{
        type: Boolean,
    },

    tertiaryYear:{
        type: Boolean,
    },

    tertiaryDiploma:{
        type: Boolean,
    },

    masteral:{
        type: Boolean,
    },

    masteralDegree:{
        type: Boolean,
    },

    masteralYear:{
        type: Boolean,
    },

    masteralDiploma:{
        type: Boolean,
    },

    doctoral:{
        type: Boolean,
    },

    doctoralDegree:{
        type: Boolean,
    },

    doctoralYear:{
        type: Boolean,
    },

    doctoralDiploma:{
        type: Boolean,
    },

    employmentDetails:{
        type:Boolean
    },

    employer:{
        type:Boolean
    },

    jobTitle:{
        type:Boolean
    },
    employerAdd:{
        type:Boolean
    },

    membership:{
        type: Boolean,
    },

    memType1:{
        type: Boolean,
    },

    memType2:{
        type: Boolean,
    },

    memType3:{
        type: Boolean,
    },

    memType1Details:{
        type: Boolean,
    },

    memType2Details:{
        type: Boolean,
    },

    memType3Details:{
        type: Boolean,
    },

    memType1Fee:{
        type: Boolean,
    },

    memType2Fee:{
        type: Boolean,
    },

    memType3Fee:{
        type: Boolean,
    },

    memType1Process:{
        type: Boolean,
    },
    

    memType2Process:{
        type: Boolean,
    },

    memType3Process:{
        type: Boolean,
    },
    payment:{
        type: Boolean,
    },

    memType1Input:{
        type: String,
                default: null,

    },

    memType2Input:{
        type: String,
                default: null,

    },

    memType3Input:{
        type: String,
                default: null,

    },

    memType1DetailsInput:{
        type: String,
                default: null,

    },

    memType2DetailsInput:{
        type: String,
                default: null,

    },

    memType3DetailsInput:{
        type: String,
                default: null,

    },

    memType1FeeInput:{
        type: String,
                default: null,

    },

    memType2FeeInput:{
        type: String,
                default: null,

    },

    memType3FeeInput:{
        type: String,
                default: null,

    },

    memType1ProcessInput:{
        type: String,
                default: null,

        

    },

});

module.exports = mongoose.model("MemForm", membershipFormSchema)