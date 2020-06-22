const mongoose = require('mongoose');
const validator = require('validator');

const clinicSchema = mongoose.Schema({
    typeOfClinic: {
        type: String,
        required: [true, 'Please provide clinic type'],
        enum: {
            val: ['Owned Clinic', 'Visiting Clinic'],
            message: 'Clinic type must be either Owned Clinic or Visiting Clinic'
        }
    },
    clinicName: {
        type: String,
        required: [true, 'Please provide clinic name']
    },
    city: {
        type: String,
        required: [true, 'Please provide city name']
    },
    state: {
        type: String,
        required: [true, 'Please provide state name']
    },
    pincode: {
        typne: Number,
        required: [true, 'Please provide pincode']
    },
    clinicAddress: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String
    },
    clinicContactNo: {
        type: Number,
        required: [true, 'Please provide clinic contact number']
    },
    clinicAdditionalContactNo: {
        type: Number,
    },
    clinicSpecialization: {
        type: String,
        required: [true, 'Please provide specialization']
    },
    consultationFees: {
        type: Number,
        required: [true, 'Please provide consultation fees']
    },
    holidays: {
        type: [Date]
    },
    clinicTiming: {
        timingType: String,
        timing: String
    }
});

const clinic = mongoose.Model('clinic', clinicSchema);