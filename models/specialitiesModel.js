const mongoose = require('mongoose');

const primarySpeciality = mongoose.model('primarySpeciality', mongoose.Schema({
    primarySpeciality: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
}))

const subSpeciality = mongoose.model('subSpeciality', mongoose.Schema({
    subSpeciality: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
}))

const clinicServices = mongoose.model('clinicServices', mongoose.Schema({
    clinicServices: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
}))

const clinicIssues = mongoose.model('clinicIssues', mongoose.Schema({
    clinicIssues: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
}))


module.exports = {primarySpeciality,subSpeciality,clinicServices,clinicIssues};

