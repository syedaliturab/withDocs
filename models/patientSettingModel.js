const mongoose = require('mongoose');


const patientSettingSchema = mongoose.Schema({
    patientId:{
        type: String,
	    unique: true,
        requried: [true, 'Please provide valid id']
    },

    reminder : {
        before :{
            sanitaryPads : {
                sanitaryPads : Boolean,
                pads : Boolean,
                tampons : Boolean,
                cloth : Boolean
            },
            periodAlert : {
                periodAlert : Boolean,
                remindMeAt : Date,
                remindMeBefore : Number,
                reminderMessage : String
            }
        },
        after : {
            periodEnd : {
                periodEnd : Boolean,
                reminderMessage : String
            },
            // ovulation : {

            // }
        },
        pills : {
            // contraception : {

            // }
            pills : {
            fromTime : Date,
            tillTime : Date,
            noOfPillsPerDay : Number,
            stages : String,
            nameOfPill : String,
            reminderMessage : String
            }
        }
    },
    mode : {
        partnerMode : {
            partnerMode : Boolean,
            text : String
        },
        pregnancyMode : {
            notPregnant : Boolean,
            noLongerPregnant : Boolean,
            babyBorn : Boolean
        }
    },
    Date : {
        type : Date,
        default : Date.now
    },
    history : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'patientSettingHistory'
    }]
});

const patientSettingHistorySchema = new mongoose.Schema({
    input : {
        cycleLength : String,
        periodLength : String,
        ovaluationLength : String,
        pmsLength : String,
        sanitaryUsed : String
    },
    reminder : {
        before :{
            sanitaryPads : {
                sanitaryPads : Boolean,
                pads : Boolean,
                tampons : Boolean,
                cloth : Boolean
            },
            periodAlert : {
                periodAlert : Boolean,
                remindMeAt : Date,
                remindMeBefore : Number, 
                reminderMessage : String
            }
        },
        after : {
            periodEnd : {
                periodEnd : Boolean,
                reminderMessage : String
            },
            ovulation : {
                periodAlert : Boolean,
                remindMeAt : Date,
                remindMeBefore : Number,
                reminderMessage : String
            }
        },
        pills : {
            // contraception : {

            // }
            pills : {
            fromTime : Date,
            tillTime : Date,
            noOfPillsPerDay : Number,
            stages : String,
            nameOfPill : String,
            reminderMessage : String
            }
        }
    },
    mode : {
        partnerMode : {
            partnerMode : Boolean,
            text : String
        },
        pregnancyMode : {
            notPregnant : String,
            noLongerPregnant : String,
            babyBorn : Boolean
        }
    },
    Date : {
        type : Date
    }
});

const inputSettingSchema = mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
        cycleLength : Number,
        periodLength : Number,
        ovaluationLength : Number,
        pmsLength : Number,
        sanitaryUsed : String,
        height : Number,
        weight : Number,

});


const padSettingSchema = mongoose.Schema({
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    sanitaryPads : {
        type: Boolean, 
        default: false,
        once: {type: Boolean, default: false},
        twice: {type: Boolean, default: false},
        thrice: {type: Boolean, default: false},
        fourTimes: {type: Boolean, default: false},
        fifthHour: {type: Boolean, default: false},
        twoHour: {type: Boolean, default: false}
    },
    tampons : {
        type: Boolean, 
        default: false,
        once: {type: Boolean, default: false},
        twice: {type: Boolean, default: false},
        thrice: {type: Boolean, default: false},
        fourTimes: {type: Boolean, default: false},
        fifthHour: {type: Boolean, default: false},
        twoHour: {type: Boolean, default: false}
    },
    cloth : {
        type: Boolean, 
        default: false,
        once: {type: Boolean, default: false},
        twice: {type: Boolean, default: false},
        thrice: {type: Boolean, default: false},
        fourTimes: {type: Boolean, default: false},
        fifthHour: {type: Boolean, default: false},
        twoHour: {type: Boolean, default: false}
    },

});
const inputSetting = mongoose.model('inputSetting', inputSettingSchema);
const padSetting = mongoose.model('padSetting', padSettingSchema);
// const discharge = mongoose.model('discharge', dischargeModel);
// const intimacyAndPhases = mongoose.model('intimacyAndPhases', intimacyAndPhasesModel);
// const pregnancyTest = mongoose.model('pregnancyTest', pregnancyTestModel);
const patientSetting = mongoose.model('patientSetting', patientSettingSchema);
const patientSettingHistory = mongoose.model('patientSettingHistory', patientSettingHistorySchema);
module.exports = {patientSetting, patientSettingHistory, inputSetting, padSetting};