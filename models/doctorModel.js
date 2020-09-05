const mongoose = require('mongoose');
const validator = require('validator');
const doctor = new mongoose.Schema({
    _id:{
        type: String,
	    unique: true,
        requried: [true, 'Please provide valid id']
    },
    userId: {
        type: String,
	    unique: true,
        requried: [true, 'Please provide valid id']
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
        length: [6, 'Please provide 6 digit pincode']
    },
    homeAddress: {
        type: String
    },
    contactNo: {
        type: String,
        unique: true,
    },
    alternateContactNo: {
        type: String
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female','Other'],
            message: 'gender is either Male, Female or Other'
        }
    },
    stream: {
        type: String
    },
    education: [{
        degree: String,
        college: String,
        yearOfPassing: String 
    }],  
    registration: {
        registrationNo: String,
        registrationCouncil: String,
        registrationYear: String,
    },
    primarySpeciality: {
        type: String
    },
    specialities: {
        type: [String]
    },
    memberships: {
        type: [String],
    },
    experience: {
        type: Number,
    },
    eligiblity: {
        type: [Boolean],
    },
    workingHours: {
        sunday: {
            morning: {
                slot: String,
                clinicName: String
            },
            evening: {
                slot: String,
                clinicName: String
            },   
        },
        monday: {
            morning: {
                slot: String,
                clinicName: String
            },
            evening: {
                slot: String,
                clinicName: String
            },   
        },
        tuesday: {
            morning: {
                slot: String,
                clinicName: String
            },
            evening: {
                slot: String,
                clinicName: String
            },   
        },
        wednesday: {
            morning: {
                slot: String,
                clinicName: String
            },
            evening: {
                slot: String,
                clinicName: String
            },  
        },
        thursday: {
            morning: {
                slot: String,
                clinicName: String
            },
            evening: {
                slot: String,
                clinicName: String
            },    
        },
        friday: {
            morning: {
                slot: String,
                clinicName: String
            },
            evening: {
                slot: String,
                clinicName: String
            },   
        },
        saturday: {
            morning: {
                slot: String,
                clinicName: String
            },
            evening: {
                slot: String,
                clinicName: String
            },   
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const DocUser = mongoose.model('Doctors',doctor);
module.exports = DocUser;
