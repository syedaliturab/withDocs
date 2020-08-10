const mongoose = require('mongoose');
const validator = require('validator');
const doctor = new mongoose.Schema({
    _id:{
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
});

const DocUser = mongoose.model('Doctors',doctor);
module.exports = DocUser;
