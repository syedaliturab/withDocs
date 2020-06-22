const mongoose = require('mongoose');

const clinicSchema = mongoose.Schema({
    typeOfClinic: {
        type: String,
    },
    clinicName: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: Number,
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
    },
    clinicAdditionalContactNo: {
        type: Number,
    },
    clinicSpecialization: {
        type: [String],
    },
    clinicServices: {
        type: [String],
    },
    consultationFees: {
        type: Number,
    },
    holidays: {
        type: [String]
    },
    clinicTiming: {
        day: [String],
        timing: [String]
    },
    
});
