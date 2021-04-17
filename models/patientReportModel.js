const mongoose = require("mongoose");

const regularAndIrregularModel = new mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    regularCount : {
        type : Number,
        default : 0
    }, 
    irregularCount : {
        type : Number,
        default : 0
    },
    predictatedStartDate : Date, //two variations
    predictatedEndDate : Date,
    actualStartDate : Date,
    actualEndDate : Date,
    diffInDate : Number,
    currentDate : {
        type : Date,
        default : Date.now
    }
});

const flowModel = new mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    light : {
        type : Boolean,
        default : false
    },
    medium : {
        type : Boolean,
        default : false
    },
    heavy : {
        type : Boolean,
        default : false
    },
    spotting : {
        type : Boolean,
        default : false
    },
    lightCount : {
        type : Number,
        default : 0
    },
    mediumCount : {
        type : Number,
        default : 0
    },
    heavyCount : {
        type : Number,
        default : 0
    },
    spottingCount : {
        type : Number,
        default : 0
    },
    Date : {
        type :Date,
        default : Date.now
    }
});

const dischargeModel = new mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    dry : {
        type : Boolean,
        default : false
    },
    sticky : {
        type : Boolean,
        default : false
    },
    creamy : {
        type : Boolean,
        default : false
    },
    watery : {
        type : Boolean,
        default : false
    },
    eggWhite : {
        type : Boolean,
        default : false
    },
    dryCount : {
        type : Number,
        default : 0
    },
    stickyCount : {
        type : Number,
        default : 0
    },
    creamyCount : {
        type : Number,
        default : 0
    },
    wateryCount : {
        type : Number,
        default : 0
    },
    eggWhiteCount : {
        type : Number,
        default : 0
    },
    Date : {
        type :Date,
        default : Date.now
    }
});

const intimacyAndPhasesModel = new mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    protected : Boolean,
    unProtected : Boolean,
    cycle : Number,
    period : Number,
    protectedCount : {
        type : Number,
        default : 0
    },
    unProtectedCount : {
        type : Number,
        default : 0
    },
    folicularCount : {
        type : Number,
        default : 0
    },
    ovulationCount : {
        type : Number,
        default : 0
    },
    leutalCount : {
        type : Number,
        default : 0
    },
    fertileCount : {
        type : Number,
        default : 0
    },
    periodCount : {
        type : Number,
        default : 0
    },
    folicularStartDate : Date,
    folicularEndDate : Date,
    ovulationStartDate : Date,
    ovulationEndDate : Date,
    leutalStartDate : Date,
    leutalEndDate : Date,
    fertileStartDate : Date,
    fertileEndDate : Date,
    periodStartDate : Date,
    periodEndDate : Date,
    Date : {
        type :Date,
        default : Date.now
    }
});

// const pillsModel = new mongoose.Schema({  

// });

const pregnancyTestModel = new mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    positive : Boolean,
    negative : Boolean,
    Date : {
        type : Date,
        default : Date.now
    }
});

const ovulationTestModel = new mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    positive : Boolean,
    negative : Boolean,
    Date : {
        type : Date,
        default : Date.now
    }
});

const notesModel = new mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    fertile : Boolean,
    ovulation : Boolean,
    leutal : Boolean,
    period : Boolean,
    pms : Boolean,
    note : String,
    noteCount : {
        type : Boolean,
        default : 0
    },
    Date : {
        type : Date,
        default : Date.now
    }
});

const regularAndIrregular = mongoose.model('regularAndIrregular', regularAndIrregularModel);
const flow = mongoose.model('flow', flowModel);
const discharge = mongoose.model('discharge', dischargeModel);
const intimacyAndPhases = mongoose.model('intimacyAndPhases', intimacyAndPhasesModel);
const pregnancyTest = mongoose.model('pregnancyTest', pregnancyTestModel);
const ovulationTest = mongoose.model('ovulationTest', ovulationTestModel);
const notes = mongoose.model('notes', notesModel);
module.exports = {regularAndIrregular, flow, discharge, intimacyAndPhases, pregnancyTest, ovulationTest, notes};