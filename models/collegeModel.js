const mongoose = require('mongoose');

const colleges = mongoose.Schema({
    collegeName : {
        type: String,
        unique: true,
        require: true
    },
    speciality: {
        type: String,
        require: true
    }
});

const degrees = mongoose.Schema({
    degree : {
        type: String,
        unique: true,
        require: true
    },
    stream: {
        type: String,
        require: true
    }
});


const memberships = mongoose.Schema({
    membership : {
        type: String,
        unique: true,
        require: true
    },
});

const specialitiesSchema = mongoose.Schema({
    primarySpeciality: {
        type: String,
    }, 
    subSpeciality: {
        type: String,
    },
    clinicServices: {
        type: String,
    },  
    clinicIssues: {
        type: String,
    },
});
specialitiesSchema.index({ primarySpeciality: 1, subSpeciality: 1, clinicServices: 1, clinicIssues: 1 }, { unique: true });

const CollegeNames = mongoose.model('Colleges',colleges);
const DegreeNames = mongoose.model('Degrees',degrees);
const MembershipNames = mongoose.model('Memberships',memberships);
const Specialities = mongoose.model('Specialities',specialitiesSchema);
module.exports = {CollegeNames,DegreeNames,MembershipNames,Specialities};