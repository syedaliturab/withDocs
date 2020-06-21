const mongoose = require('mongoose');
const validator = require('validator');
const doctor = new mongoose.Schema({
    _id:{
        type: String,
        requried: [true, 'Please provide valid id']
    },
    name: {
        type: String,
        requried: [true, 'Please provide your name']
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Please provide dateOfBirth']
    },
    address: {
        state: {
            type: String,
            required: [true, 'Please provide state']
        },
        city: {
            type: String,
            required: [true, 'Please provide a city']
        },
        pincode: {
            type: Number,
            required: [true, 'Please provide pincode'],
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

    },
    contactNo: {
        type: Number,
        unique: true,
        required: [true, 'Please provide contact number']
    },
    alternateContactNo: {
        type: Number
    },
    gender: {
        type: String,
        required: [true, 'Please provide gender'],
        enum: {
            values: ['male', 'female','other'],
            message: 'gender is either male, female or other'
        }
    },
    education: {
        undergraduation: {
            degree: {
                type: String
            },
            college: {
                type: String
            },
            dateOfGraduation: {
                type: String
            },
            doctorRegistrationNo: {
                type: String
            }
        },
        diploma: {
            degree: {
                type: String
            },
            college: {
                type: String
            },
            dateOfGraduation: {
                type: String
            },
            doctorRegistrationNo: {
                type: String
            }
        },
        postgraduation: {
            degree: {
                type: String
            },
            college: {
                type: String
            },
            dateOfGraduation: {
                type: String
            },
            doctorRegistrationNo: {
                type: String
            }
        },

    },
    field: {
        type: String,
        required: [true, 'Please provide field of work']
    },
    specialities: [{
            type: String
    }],
    experience: {
        type: Number,
        required: [true, 'Please provide your experience']
    },
    
});

const DocUser = mongoose.model('Docters',doctor);
module.exports = DocUser;