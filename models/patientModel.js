mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = mongoose.Schema({
    _id:{
        type: String,
	    unique: true,
        requried: [true, 'Please provide valid id']
    },
    name: {
        type: String,
    },
    age : {
        type : Number
    },
    relatives :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'patientRelative'
    }],
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    status : {
        type : String
    },
    emergencyContacts : [{
        type : Number
    }],
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
    pain: {
        type : String
    },
    allergies : [{
        type : String
    }],
    injuries : [{
        type : String
    }],
    surgeries : [{
        type : String
    }],
    currentMedications : [{
        type : String
    }],
    pastMedications : [{
        type : String

    }],
    chronicDiseases : [{
        type : String

    }],
    heridatoryDiseases : [{
        type : String
    }],
    drinking : String,
    smoking : String,
    chewingTobako : String,
    lifestyle : String,
    foodPreference : String,
    moodsAndSymptoms : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'moodsAndSymptoms'
    }
});

const patientRelativeSchema = new mongoose.Schema({
    relativeId : {
        type: String,
	    unique: true,
        requried: [true, 'Please provide valid id']
    },
    relationship : {
        type : String
    },
    name : {
        type : String
    },
    dateOfBirth : {
        type : String
    },
    age: {
        type : Number
    },
    contactNo : {
        type :Number
    },
    status : {
        type : String
    },
    occupation : {
        type : String
    }
})

const moodsAndSymptomsSchema = new mongoose.Schema({
    gender : {
        type : String,
        enum : {
            values : 'female',
            message: 'gender is only female'
        }
    },
    symptoms : [{
        name: String,
        description : String,
        level: {
            type : Number,
            default : 0
        }
    }],
    moods : [{
        name: String,
        description : String,
        level: {
            type : Number,
            default : 0
        }
    }],
    date : {
        type : Date,
        default : Date.now
    }
})

const patientRelative = mongoose.model('patientRelative', patientRelativeSchema);
const patient = mongoose.model('Patient',patientSchema);
const moodsAndSymptoms = mongoose.model('moodsAndSymptoms', moodsAndSymptomsSchema);
module.exports = {patient, patientRelative, moodsAndSymptoms};