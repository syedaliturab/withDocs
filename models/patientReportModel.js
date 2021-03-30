const mongoose = require("mongoose");
const validator = require('validator');

const patientReportModel = new mongoose.Schema({
    regularAndIrregular : {
        regularCount : {
            type : Number,
            default : 0
        }, 
        irregularCount : {
            type : Number,
            default : 0
        }
    },
    intimacy : {
        protectedCount : {
            type : Number,
            default : 0
        },
        unProtectedCount : {
            type : Number,
            default : 0
        }
    },
    flow : {
        light : {
            type : Number,
            default : 0
        },
        medium : {
            type : Number,
            default : 0
        },
        heavy : {
            type : Number,
            default : 0
        },
        spotting : {
            type : Number,
            default : 0
        }
    },
    averages : {
        cycle: {
            type : Number,
            default : 0
        },
        period : {
            type : Number,
            default : 0
        }
    },
    fertilePhase : {
        startDate : Date,
        endDate : Date
    },
    test :{
        positive : {
            Date : Date
        },
        negative : {
            Date : Date
        }
    },
    Date : {
        type : Date,
        default : Date.now
    },
    history : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'patientReportHistory'
    }]
});

const patientReportHistoryModel = new mongoose.Schema({
    regularAndIrregular : {
        regularCount : {
            type : Number,
            default : 0
        },
        irregularCount : {
            type : Number,
            default : 0
        },

    },
    intimacy : {
        protectedCount : {
            type : Number,
            default : 0
        },
        unProtectedCount : {
            type : Number,
            default : 0
        },

    },
    flow : {
        light : {
            type : Number,
            default : 0
        },
        medium : {
            type : Number,
            default : 0
        },
        heavy : {
            type : Number,
            default : 0
        },
        spotting : {
            type : Number,
            default : 0
        },
    },
    averages : {
        cycle: {
            type : Number,
            default : 0
        },
        period : {
            type : Number,
            default : 0
        }
    },
    fertilePhase : {
        startDate : Date,
        endDate : Date
    },
    test :{
        positive : {
            Date : Date
        },
        negative : {
            Date : Date
        }
    },
    Date : {
        type : Date
    }
});

const patientReport = mongoose.model('patientReport', patientReportModel);
const patientReportHistory = mongoose.model('patientReportHistory', patientReportHistoryModel);
mondule.export = {patientReport, patientReportHistory};