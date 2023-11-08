const {Router} = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Member = require('../models/member');
const Organization = require('../models/organization');
const Events = require('../models/events');
const MemForm = require('../models/membershipForm');

const Admin = require('../models/admin');
const EventRegForm = require('../models/eventregForm');
const MembershipApplication = require('../models/membershipApplication');


const ObjectId = mongoose.Types.ObjectId;


const router = Router()

//CREATE ADMIN
router.post('/admin', async (req, res) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let password = req.body.password
  let userType = req.body.userType


  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const record = await Admin.findOne({ email:email });

  if (record) {
      return res.status(400).send({
        message: "Email is already registered",
      });
    } else {

  const admin = new Admin({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashedPassword,
      userType:userType,
  })

  const result = await admin.save();

  //JWT 

  const { _id } = await result.toJSON();

  const token = jwt.sign({ _id: _id }, "secret");

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.send({
      message: "success"
  })
}

});


//MEMBER REGISTRATION
router.post('/register', async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let userType = req.body.userType

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).send({
          message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character."
      });
  }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const record = await Member.findOne({ email:email });

    if (record) {
        return res.status(400).send({
          message: "Email is already registered",
        });
      } else {

    const member = new Member({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword,
        userType:userType,
    })

    const result = await member.save();

    //JWT 

    const { _id } = await result.toJSON();

    const token = jwt.sign({ _id: _id }, "secret");

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.send({
        message: "success"
    })
}

});

//READ Member

router.get('/viewmember', async (req, res) => {
  try {
    const member = await Member.find({});
    res.send(member);
  } catch (error) {
    res.status(400).send(error);
  }

}  );

//UPDATE Member

router.patch('/member/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const updateMember = await Member.findByIdAndUpdate(_id,body,{new:true});
    if(!updateMember)
    {
      return res.status(404).send;
    }
    return res.status(200).send(updateMember);
   
  } catch (error) {
    res.status(400).send(error);
  }

});

//DELETE Member
router.delete('/member/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteMember = await Member.findByIdAndDelete(_id);
    if(!deleteMember)
    {
     return res.status(404).send();
    }
    
    res.status(201).send(
      {
        "status" : true,
        "message" : "student deleted"
      }
    );
   
  } catch (error) {
    res.status(400).send(error);
  }

});


//LOGIN
router.post('/login', async (req, res) => {
  const member = await Member.findOne({email:req.body.email})
  const organization = await Organization.findOne({email:req.body.email})
  const admin = await Admin.findOne({email:req.body.email})

  if(!member){//if there is no member // A (pag walang member)

      if (!organization){ //A // then check if there  is org // B (pag walang org)

      if(!admin){ //B// check if may admin // (pag walang admin)
        return res.status(404).send({
          message:"User Not Found"
        })
      }

      else if (!(await bcrypt.compare(req.body.password, admin.password))){  // Pag merong admin, check if valid si pass (pag di valid) // C
        return res.status(400).send ({//c// pag di valid pass this one
          message:"Password is Incorrect"
        });

      } // c

      const token = jwt.sign({ // but if hindi mali, then sign token
        _id: admin._id, 
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        userType: admin.userType
      
      },"secret") //but this if valid
    
      res.cookie("jwt", token,{
        httpOnly:true,
        maxAge:3*24*60*60*1000,
      })
    
      res.send({
        message:"success"
      })
      
      } // if may org

      else if (!(await bcrypt.compare(req.body.password, organization.password))){ // if may org compare pass,
        return res.status(400).send ({// then this
          message:"Password is Incorrect"
        });
  }// pag hindi mali,

  else{const token = jwt.sign({
    _id: organization._id, 
    userType: organization.userType, 
    orgName: organization.orgName},"secret") //sign pag di mali

  res.cookie("jwt", token,{
    httpOnly:true,
    maxAge:3*24*60*60*1000,
  })

  res.send({
    message:"success"
  });}

  } // pag may member

  else if(!(await bcrypt.compare(req.body.password, member.password))){ //but if there is, the check pass, if not valid // B
    return res.status(400).send ({// then this
      message:"Password is Incorrect"
    });
  } //B

  else {const token = jwt.sign({
    _id: member._id, 
    email: member.email,
    firstName: member.firstName,
    lastName: member.lastName,
    userType: member.userType
  
  },"secret") //but this if valid

  res.cookie("jwt", token,{
    httpOnly:true,
    maxAge:3*24*60*60*1000,
  })

  res.send({
    message:"success"
  })
}
});

// LOGIN VERIFICATION
      router.get('/current', async (req, res) => {
        try {
            const cookie = req.cookies['jwt'];
            const claims = jwt.verify(cookie, "secret");
    
            if (!claims) {
                return res.status(401).send({
                    message: "unauthenticated"
                });
            }
    
            let user;

            if (claims.userType === 'member') {
                user = await Member.findOne({ _id: claims._id });
            } else if (claims.userType === 'organization') {
                user = await Organization.findOne({ _id: claims._id });
            }
            else if (claims.userType === 'admin') {
              user = await Admin.findOne({ _id: claims._id });
          }
    
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
    
            const { password, ...data } = await user.toJSON();
            res.send(data);
        } catch (err) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }
    });
   
  // TO GET DETAILS FOR LOGGED IN MEMBER
    router.get('/member', async (req, res) => {
      try{
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie,"secret")
  
        if(!claims){
          return res.status(401).send({
            message: "unauthenticated"
          })
        }
  
        const member = await Member.findOne({_id:claims._id})
        const {password,...data} = await member.toJSON()
  
        res.send(data)
  
      }
      catch(err){
        return res.status(401).send({
          message:'unauthenticated'
        })
      }
  });
  
  // TO GET DETAILS FOR LOGGED IN ORGANIZATION

router.get('/organization', async (req, res) => {
  try{
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie,"secret")

    if(!claims){
      return res.status(401).send({
        message: "unauthenticated"
      })
    }

    const organization = await Organization.findOne({_id:claims._id})
    const {password,...data} = await organization.toJSON()

    res.send(data)

  }
  catch(err){
    return res.status(401).send({
      message:'unauthenticated'
    })
  }
});

  // TO GET DETAILS FOR LOGGED IN ADMIN

router.get('/admin', async (req, res) => {
  try{
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie,"secret")

    if(!claims){
      return res.status(401).send({
        message: "unauthenticated"
      })
    }

    const admin = await Admin.findOne({_id:claims._id})
    const {password,...data} = await admin.toJSON()

    res.send(data)

  }
  catch(err){
    return res.status(401).send({
      message:'unauthenticated'
    })
  }
});

//LOGOUT
router.post('/logout', (req,res) =>{
  res.cookie("jwt", "", {maxAge:0})

  res.send({
    message:"success"
  });
});


//ORGANIZATION REGISTRATION
router.post('/orgRegister', async (req, res) => {
  let orgName = req.body.orgName
  let orgType = req.body.orgType
  let email = req.body.email
  let password = req.body.password
  let about = req.body.about
  let orgHistory = req.body.orgHistory
  let mission = req.body.mission
  let vision = req.body.vision
  let coreValues = req.body.coreValues
  let userType = req.body.userType
  let logo = req.body.logo
  let orgCode = req.body.orgCode

 

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const record = await Organization.findOne({ email:email });

  if (record) {
      return res.status(400).send({
        message: "Email is already registered",
      });
    } else {

  const organization = new Organization({
      orgName:orgName,
      orgType:orgType,
      email:email,
      password:hashedPassword,
      about:about,
      orgHistory:orgHistory,
      mission:mission,
      vision:vision,
      coreValues:coreValues,
      userType:userType,
      logo: logo,
      orgCode: orgCode
  })

  const result = await organization.save();
  res.status(201).json({ orgID: result._id, message: 'Organization created successfully' });
}

});

//READ Organization

router.get('/vieworganization', async (req, res) => {
  try {
    const organization = await Organization.find({});
    res.send(organization);
  } catch (error) {
    res.status(400).send(error);
  }

}  );

//UPDATE Organization

router.patch('/organization/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const updateOrganization = await Organization.findByIdAndUpdate(_id,body,{new:true});
    if(!updateOrganization)
    {
      return res.status(404).send;
    }
    return res.status(200).send(updateOrganization);
   
  } catch (error) {
    res.status(400).send(error);
  }

});

//DELETE Org
router.delete('/organization/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteOrganization = await Organization.findByIdAndDelete(_id);
    if(!deleteOrganization)
    {
     return res.status(404).send();
    }
    
    res.status(201).send(
      {
        "status" : true,
        "message" : "organization deleted"
      }
    );
   
  } catch (error) {
    res.status(400).send(error);
  }

});

// CUSTOMIZE MEMBERSHIP FORM
router.patch('/customizeForm/:orgID', async (req, res) => {
  try {
    const orgID = req.params.orgID;
    const body = req.body;
    const updateMemForm = await MemForm.findOneAndUpdate({ orgID }, body, { new: true });

    if (!updateMemForm) {
      return res.status(404).send();
    }

    return res.status(200).send(updateMemForm);
  } catch (error) {
    res.status(400).send(error);
  }
});


// AUTOMATICALLY CREATE FORM UPON ORG REG
router.post('/createForm', async (req, res) => {
  let orgID = req.body.orgID
  let memType1Input = req.body.memType1Input
  let memType2Input = req.body.memType2Input
  let memType3Input = req.body.memType3Input
  let memType1DetailsInput = req.body.memType1DetailsInput
  let memType2DetailsInput = req.body.memType2DetailsInput
  let memType3DetailsInput = req.body.memType3DetailsInput
  let memType1FeeInput = req.body.memType1FeeInput
  let memType2FeeInput = req.body.memType2FeeInput
  let memType3FeeInput = req.body.memType3FeeInput
  let memType1ProcessInput = req.body.memType1ProcessInput
 

  try {
      // Create a new Member instance with checkbox data
      const newMembershipForm = new MemForm({

        personalInfo: true,
        fullName: true, sex: false,
        birthDate: true, placeOfBirth : false,
        civilStatus: false, religion: false,
        address: false, zip: false,
        email: true, contactNum: false,
        facebook: false, linkedIn:false,
        skype: false, zoom: false,
        idLicense: false, prcNo : false,
        prcDate: false, prcExpiration: false,
        studentID: false, aviation: false,
        caap: false, taxID: false, EducAttainment: false,
        tertiary: false, tertiaryDegree: false,
        tertiaryYear: false, tertiaryDiploma : false,
        masteral: false, masteralDegree: false,
        masteralYear: false, masteralDiploma: false,
        doctoral: false, doctoralDegree: false,
        doctoralYear: false, employmentDetails: false,
        employer: false, jobTitle: false,
        employerAdd: false, membership: false,
        memType1: false, memType2: false,
        memType3: false,
        memType1Details: false, memType2Details: false,
        memType3Details: false, memType1Fee: false,
        memType2Fee: false, memType3Fee: false,
        memType1Process: false, memType2Process: false,
        memType3Process: false, payment: false,
        
        memType1Input : memType1Input,
        memType2Input : memType2Input,
        memType3Input : memType3Input,
        memType1DetailsInput : memType1DetailsInput,
        memType2DetailsInput : memType2DetailsInput,
        memType3DetailsInput : memType3DetailsInput,
        memType1FeeInput : memType1FeeInput,
        memType2FeeInput : memType2FeeInput,
        memType3FeeInput : memType3FeeInput,
        memType1ProcessInput : memType1ProcessInput,
        orgID:orgID,     
        

      })

      await newMembershipForm.save();

      res.status(201).json({ message: 'Member created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//READ memform - mem side

router.get('/myMemForm/:id', async (req, res) => {
  try {
    const _id = req.params.id; 
    const memForm = await MemForm.findOne({ orgID: _id });
    res.send(memForm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ memform - org side
router.get('/memForm', async (req, res) => {
  try{
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie,"secret")

    if(!claims){
      return res.status(401).send({
        message: "unauthenticated"
      })
    }

    const memForm = await MemForm.findOne({orgID:claims._id})
    const {...data} = await memForm.toJSON()

    res.send(data)

  }
  catch(err){
    return res.status(401).send({
      message:'not found'
    })
  }
});


//READ specific org via card
router.get('/thisOrg/:id', async (req, res) => {
  try {
    const orgId = req.params.id; // 
    const thisOrg = await Organization.findById(orgId);
    if (!thisOrg) {
      return res.status(404).send({ error: 'Organization not found' });
    }
    res.send(thisOrg);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//READ specific org via orgCode
router.get('/thisOrg1/:orgCode', async (req, res) => {
  try {
    const orgCode = req.params.orgCode; 
    const organization = await Organization.findOne({ orgCode: orgCode });
    if (!organization) {
      return res.status(404).send({ error: 'Organization not found' });
    }
    res.send(organization);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


//create event
router.post('/createEvent', async (req, res) => {
  let orgID = req.body.orgID;
  let orgName = req.body.orgName;
  let eventTitle = req.body.eventTitle;
  let eventDesc = req.body.eventDesc;
  let eventDate = req.body.eventDate;
  let eventTime = req.body.eventTime;
  let location = req.body.location;
  let meetingURL = req.body.meetingURL;
  let poster = req.body.poster;
  let programme = req.body.programme;
  let video = req.body.video;
  let eventSeats = req.body.eventSeats;
  let eventPrice = req.body.eventPrice;
  let eventPaymentDetails = req.body.eventPaymentDetails;

  try {
    const events = new Events({
      orgID: orgID,

      orgName: orgName,
      eventTitle: eventTitle,
      eventDesc: eventDesc,
      eventDate: eventDate,
      eventTime: eventTime,
      location: location,
      meetingURL: meetingURL,
      poster: poster,
      programme: programme,
      video: video,
      eventSeats: eventSeats,
      eventPrice: eventPrice,
      eventPaymentDetails: eventPaymentDetails
    });

    await events.save();
    res.status(201).json({ events});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//read events
router.get('/viewevent', async (req,res) => {
  try {
    const event = await Events.find({});
    res.send(event)
  } catch (error) {
    res.status(400).send(error)
  }
})

//update event
router.patch('/event/:id', async (req, res) => {
  try {
    const eventID = req.params.id;
    const body = req.body;
    const updateEvent = await Events.findByIdAndUpdate(eventID,body,{new:true});
    if(!updateEvent)
    {
      return res.status(404).send;
    }
    return res.status(200).send(updateEvent);
   
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete event 
router.delete('/event/:id', async (req, res) => {
  try {
    const eventID = req.params.id;
    const deleteEvent = await Events.findByIdAndDelete(eventID);
    if(!deleteEvent)
    {
     return res.status(404).send();
    }
    
    res.status(201).send(
      {
        "status" : true,
        "message" : "event deleted"
      }
    );
  } catch (error) {
    res.status(400).send(error);
  }

});

//display events of an org
router.get('/events/:orgID', async (req, res) => {
  try{
    const orgID  = req.params.orgID;
    const orgEvent = await Events.find({ orgID: orgID });
    if (!orgEvent) {
    return res.status(404).send({ error: 'Organization not found' });
    }
    res.send(orgEvent);
    } catch (error) {
  res.status(500).send({ error: 'Internal Server Error' });
  }
})

// display org-event details
router.get('/thisevent/:id', async (req, res) => {
  try {
    const eventID = req.params.id; // 
    const thisOrg = await Events.findById(eventID);
    if (!thisOrg) {
      return res.status(404).send({ error: 'Event not found' });
    }
    res.send(thisOrg);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//MEMBERSHIP APPLICATION
router.post('/membershipApplication', async (req, res) => {
  let orgID = req.body.orgID;
  let memID = req.body.memID;
  let isVerified = req.body.isVerified;
  let isRejected = req.body.isRejected;
  let remarks = req.body.remarks;
  let photo = req.body.photo;

  let fullName = req.body.fullName;
  let sex = req.body.sex;
  let birthDate = req.body.birthDate;
  let placeOfBirth = req.body.placeOfBirth;
  let civilStatus = req.body.civilStatus;
  let religion = req.body.religion;
  let address = req.body.address;
  let zip = req.body.zip;
  let email = req.body.email;
  let contactNum = req.body.contactNum;
  let facebook = req.body.facebook;
  let linkedIn = req.body.linkedIn;
  let skype = req.body.skype;
  let zoom = req.body.zoom;
  let prcNo = req.body.prcNo;
  let prcDate = req.body.prcDate;
  let prcExpiration = req.body.prcExpiration;
  let studentID = req.body.studentID;
  let aviation = req.body.aviation;
  let caap = req.body.caap;
  let taxID = req.body.taxID;
  let tertiary = req.body.tertiary;
  let tertiaryDegree = req.body.tertiaryDegree;
  let tertiaryYear = req.body.tertiaryYear;
  let tertiaryDiploma = req.body.tertiaryDiploma;
  let masteral = req.body.masteral;
  let masteralDegree = req.body.masteralDegree;
  let masteralYear = req.body.masteralYear;
  let masteralDiploma = req.body.masteralDiploma;
  let doctoral = req.body.doctoral;
  let doctoralDegree = req.body.doctoralDegree;
  let doctoralYear = req.body.doctoralYear;
  let employer = req.body.employer;
  let jobTitle = req.body.jobTitle;
  let employerAdd = req.body.employerAdd;
  let payment = req.body.payment;
  let chooseMem = req.body.chooseMem;

  try {

    
    const membershipApplication = new MembershipApplication({
      orgID: orgID,
      memID : memID,
       isVerified : isVerified,
       isRejected : isRejected,
       remarks : remarks,
       photo: photo,

      fullName: fullName,
      sex: sex,
      birthDate: birthDate,
      placeOfBirth: placeOfBirth,
      civilStatus: civilStatus,
      religion: religion,
      address: address,
      zip: zip,
      email: email,
      contactNum: contactNum,
      facebook: facebook,
      linkedIn : linkedIn,
      skype : skype,
      zoom : zoom,
      prcNo : prcNo,
      prcDate : prcDate,
      prcExpiration : prcExpiration,
      studentID : studentID,
      aviation : aviation,
      caap : caap,
      taxID : taxID,
      tertiary : tertiary,
      tertiaryDegree : tertiaryDegree,
      tertiaryYear : tertiaryYear,
      tertiaryDiploma : tertiaryDiploma,
      masteral : masteral,
      masteralDegree : masteralDegree,
      masteralYear : masteralYear,
      masteralDiploma : masteralDiploma,
      doctoral : doctoral,
      doctoralDegree : doctoralDegree,
      doctoralYear : doctoralYear,
      employer : employer,
      jobTitle : jobTitle,
      employerAdd : employerAdd,
      chooseMem: chooseMem,
      payment : payment,
    });

    await membershipApplication.save();
    res.status(201).json({ membershipApplication});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// MEMBERSHIP APPLICATION DISPLAY NOT VERIFIED
router.get('/verification', async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({
        message: 'unauthenticated'
      });
    }

    const membershipApplication = await MembershipApplication.find({
      $and: [{ orgID: claims._id },{ isVerified: false },{isRejected: false}]
    });

    res.send(membershipApplication);

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
});

// MEMBERSHIP APPLICATION DISPLAY VERIFIED
router.get('/myMembers', async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({
        message: 'unauthenticated'
      });
    }

    const membershipApplication = await MembershipApplication.find({
      $and: [{ orgID: claims._id },{ isVerified: true }, {isRejected: false}]
    });

    res.send(membershipApplication);

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
});


//REJECTED APPLICATIONS
router.get('/rejected', async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({
        message: 'unauthenticated'
      });
    }

    const membershipApplication = await MembershipApplication.find({
      $and: [{ orgID: claims._id },{ isVerified: false },{isRejected: true}]
    });

    res.send(membershipApplication);

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
});


//ACCEPT AND REJECT APPLICATION
router.patch('/membershipApplication/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const updateApplication = await MembershipApplication.findByIdAndUpdate(_id, body, { new: true });

    if (!updateApplication) {
      return res.status(404).send('Membership application not found');
    }

    return res.status(200).send(updateApplication);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/membershipApplication/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const updateApplication = await MembershipApplication.findByIdAndUpdate(_id, body, { new: true });

    if (!updateApplication) {
      return res.status(404).send('Membership application not found');
    }

    return res.status(200).send(updateApplication);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/applicationStatus/:id/:memID', async (req, res) => {
  try {
    const _id = req.params.id;
    const memID = req.params.memID;
    const thisApplication  = await MembershipApplication.find({
      $and: [{
         memID: memID
      }, {
         orgID: _id
      }]
   }).sort({
      dateCreated: -1
   }).limit(1);

    if (!thisApplication) {
      return res.status(404).send('Membership application not found');
    }

    return res.status(200).send(thisApplication);
  } catch (error) {
    res.status(400).send(error);
  }
});



// create event reg form 
router.post('/createRegForm', async (req, res) => {
  let orgID = req.body.orgID;
  let orgName = req.body.orgName;
  let eventID = req.body.eventID;
  let memID = req.body.memID;
  let memName = req.body.memName;
  let memType = req.body.memType;
  let proofofPayment = req.body.proofofPayment;
  let emailAddress = req.body.emailAddress;
  let contactno = req.body.contactno;
  try {
    const eventRegForm = new EventRegForm({
      orgID: orgID,
      orgName: orgName,
      eventID: eventID,
      memID: memID,
      memName: memName,
      memType: memType,
      proofofPayment: proofofPayment,
      emailAddress: emailAddress,
      contactno: contactno
    });

    await eventRegForm.save();
    res.status(201).json({ eventRegForm });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Display registered members for a specific event
router.get('/myEventForm/:eventID', async (req, res) => {
  try {
    const eventID = req.params.eventID;
    const eventForms = await EventRegForm.find({ eventID: eventID });
    if (!eventForms || eventForms.length === 0) {
      return res.status(404).send({ error: 'Members not found for the specified event' });
    }
    res.send(eventForms);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//READ Organization

router.get('/myOrganizations/:memID', async (req, res) => {
  const memID = req.params.memID;

  try {
    const membershipApplications = await MembershipApplication.find({ memID: memID });

    if (membershipApplications.length === 0) {
      return res.status(404).send('No membership applications found');
    }

    const orgIDs = membershipApplications.map(application => application.orgID);

    const organizations = await Organization.find({ _id: { $in: orgIDs } });

    console.log('orgIDs:', orgIDs);

    if (organizations.length === 0) {
      return res.status(404).send('No organizations found for the given membership applications');
    }

    res.send(organizations);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/myEvents/:memID', async (req, res) => {
  const memID = req.params.memID;

  try {
    const membershipApplications = await MembershipApplication.find({ memID: memID });

    if (membershipApplications.length === 0) {
      return res.status(404).send('No membership applications found');
    }

    const orgIDs = membershipApplications.map(application => application.orgID);

    const events = await Events.find({ orgID: { $in: orgIDs } });

    console.log('orgIDs:', orgIDs);

    if (events.length === 0) {
      return res.status(404).send('No organizations found for the given membership applications');
    }

    res.send(events);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router



//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   const record = await User.findOne({ email: req.body.email });
