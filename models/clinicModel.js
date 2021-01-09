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
    },
    nonPractising: {
        type: Boolean,
        default: false,
        select: true
    }
});

clinicSchema.index({clinicIssues : 1}, {unique : true});

const clinics = mongoose.model('Clinics',clinicSchema);
module.exports = clinics;