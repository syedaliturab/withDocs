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
        unique: true,
        validate: [validator.isEmail, 'Please provide valid email']
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
        coordinates: {
            type: [Number],
            default: []
        },
        address: String
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
            values: ['male', 'female','other'],
            message: 'gender is either male, female or other'
        }
    },
    doctorRegistrationNo: {
        type: String
    },
    experience: {
        type: Number,
    },
    education: [{
        degree: String,
        college: String,
        dateOfGraduation: String 
    }],   
    field: {
        type: String,
    },
    specialities: {
            type: [String]
    },
});

const DocUser = mongoose.model('Doctors',doctor);
module.exports = DocUser;
