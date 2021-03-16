const mongoose = require('mongoose');


const patientSettingSchema = mongoose.Schema({
    _id:{
        type: String,
	    unique: true,
        requried: [true, 'Please provide valid id']
    },
    input : {
        cycleLength : String,
        periodLength : String,
        ovaluationLength : String,
        pmsLenght : String,
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
            notPregnant : String,
            noLongerPregnant : String,
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
        pmsLenght : String,
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
            notPregnant : String,
            noLongerPregnant : String,
            babyBorn : Boolean
        }
    },
    Date : {
        type : Date
    }
});

const patientSetting = mongoose.model('patientSetting', patientSettingSchema);
const patientSettingHistory = mongoose.model('patientSettingHistory', patientSettingHistorySchema);
module.exports = {patientSetting, patientSettingHistory};