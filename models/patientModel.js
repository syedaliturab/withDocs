mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
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
        type: String
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
});

const patients = mongoose.model('Patients',patientSchema);
module.exports = patients;