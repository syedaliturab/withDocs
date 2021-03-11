const mongoose = require('mongoose');

const pain = mongoose.model('pain' ,mongoose.Schema({
    pain : {
        type: String,
        required: true,
        unique: true
    }
}));
const allergies = mongoose.model('allergies' ,mongoose.Schema({
    allergies : {
        type: String,
        required: true,
        unique: true
    }
}));
const injuries = mongoose.model('injuries' ,mongoose.Schema({
    injuries : {
        type: String,
        required: true,
        unique: true
    }
}));
const surgeries = mongoose.model('surgeries' ,mongoose.Schema({
    surgeries : {
        type: String,
        required: true,
        unique: true
    }
}));
const chronicDiseases = mongoose.model('chronicDiseases' ,mongoose.Schema({
    chronicDiseases : {
        type: String,
        required: true,
        unique: true
    }
}));

const heridatoryDiseases = mongoose.model('heridatoryDiseases' ,mongoose.Schema({
    heridatoryDiseases : {
        type: String,
        required: true,
        unique: true
    }
}));
const currentMedications = mongoose.model('currentMedications' ,mongoose.Schema({
    currentMedications : {
        type: String,
        required: true,
        unique: true
    }
}));
const pastMedications = mongoose.model('pastMedications' ,mongoose.Schema({
    pastMedications : {
        type: String,
        required: true,
        unique: true
    }
}));

module.exports = {pain, allergies, injuries, surgeries, chronicDiseases, heridatoryDiseases, currentMedications, pastMedications};