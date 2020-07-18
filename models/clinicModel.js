const mongoose = require('mongoose');
const clinic = require('./../models/clinicSingleModel');
const clinicSchema = mongoose.Schema({
    _id:{
        type: String,
	    unique: true,
        requried: [true, 'Please provide valid id']
    },
    clinicOne: {
        type: clinic,
        default: []
    },
    clinicTwo: {
        type: clinic,
        default: []
    }
});

const clinics = mongoose.model('Clinics',clinicSchema);
module.exports = clinics;