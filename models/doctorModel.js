const mongoose = require('mongoose');
const validator = require('validator');
const clinic = require('./../models/clinicModel');
const doctor = new mongoose.Schema({
    id:{
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
        // GeoJSON   
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
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
    degree: {
        type: [String]
    },
    college: {
        type: [String]
    },
    dateOfGraduation: {
        type: [String]
    },
    doctorRegistrationNo: {
        type: [String]
    },    
    field: {
        type: String,
    },
    specialities: {
            type: [String]
    },
    experience: {
        type: Number,
    },
    clinics: {
        type: [clinic.clinicSchema],
        default: []
    }
    
});

const DocUser = mongoose.model('Docters',doctor);
module.exports = DocUser;
