mongoose = require('mongoose');
const { mongo } = require('mongoose');
const validator = require('validator');
const {moods, symptoms} = require('../models/moodsAndSymptomsModel');
const {patientSetting, inputSetting, padSetting} = require('../models/patientSettingModel');

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
    image: String,
    relatives :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'patientRelative'
    }],
    email: {
        type: String,
        // unique: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    emailVerificationStatus : {
        type : Boolean,
        default : false
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
    locality : {
        type :String
    },
    bloodGroup : {
        type : String
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
    weight : String,
    height : String,
    bmi : String,
    occupation : {
        type : String
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
    brushing : String,
    skinType : String,
    hairType : String,
    drinking : String,
    smoking : String,
    chewingTobacco : String,
    lifestyle : String,
    foodPreference : String,
    latitude : Number,
    longitude : Number,
    moods : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'moods'
    },
    symptoms : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'symptoms'
    },
    input : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'inputSetting'
    },
    sanitaryPads : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'padSetting'
    },
    periodAlert : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'periodAlertSetting'
    },
    pills : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'pillsSetting'
    },
    contraception : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'contraceptionSetting'
    },
    periodEnd : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'periodEndSetting'
    },
    ovulation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ovulationSetting'
    },
    settings : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'patientSetting'
    },
    regularAndIrregular : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'regularAndIrregular'
    },
    flow : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'flow'
    },
    discharge : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'discharge'
    },
    intimacyAndPhases : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'intimacyAndPhases'
    },
    pregnancyTest : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'pregnancyTest'
    },
    ovulationTest : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ovulationTest'
    },
    pills : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'pills'
    },
    notes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'notes'
    }
});

const patientRelativeSchema = new mongoose.Schema({
    patientId : {
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
    image : String,
    contactNo : {
        type :Number
    },
    status : {
        type : String
    },
    occupation : {
        type : String
    }
});

const patientRelative = mongoose.model('patientRelative', patientRelativeSchema);
const patient = mongoose.model('Patient',patientSchema);
module.exports = {patient, patientRelative};