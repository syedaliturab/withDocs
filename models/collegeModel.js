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

const CollegeNames = mongoose.model('Colleges',colleges);
const DegreeNames = mongoose.model('Degrees',degrees);
const MembershipNames = mongoose.model('Memberships',memberships);
module.exports = {CollegeNames,DegreeNames,MembershipNames};