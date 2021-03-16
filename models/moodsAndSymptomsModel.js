mongoose = require('mongoose');
const validator = require('validator');

const moodsSchema = new mongoose.Schema({
        calm : {
            type : Number,
            default : 0
        },
        happy : {
            type : Number,
            default : 0
        },
        stressed  : {
            type : Number,
            default : 0
        },
        unfocused  : {
            type : Number,
            default : 0
        },
        energetic : {
            type : Number,
            default : 0
        },
        cranky : {
            type : Number,
            default : 0
        },    
        moodSwings : {
            type : Number,
            default : 0
        },    
        irritated : {
        type : Number,
        default : 0
        },    
        sad : {
        type : Number,
        default : 0
        },    
        anxiety : {
        type : Number,
        default : 0
        },    
        depressed  : {
        type : Number,
        default : 0
        },    
        obsessiveThoughts : {
        type : Number,
        default : 0
        },    
        apathetic : {
        type : Number,
        default : 0
        },    
        confused: {
        type : Number,
        default : 0
        },    
        selfCritical: {
        type : Number,
        default : 0
        },    
        angry : {
        type : Number,
        default : 0
        },    
        confident : {
        type : Number,
        default : 0
        },    
        emotional: {
        type : Number,
        default : 0
        },    
        frustrated : {
        type : Number,
        default : 0
        },    
        highSexDrive : {
        type : Number,
        default : 0
        },    
        lowSexDrive: {
        type : Number,
        default : 0
        },    
        sleepy : {
        type : Number,
        default : 0
        },    
        lazy : {
        type : Number,
        default : 0
        },
        history : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'moodsHistory'
        }],
        date : {
            type : Date,
            default : Date.now
        }
});

const moodsHistorySchema = new mongoose.Schema({
    calm : {
        type : Number,
        default : 0
    },
    happy : {
        type : Number,
        default : 0
    },
    stressed  : {
        type : Number,
        default : 0
    },
    unfocused  : {
        type : Number,
        default : 0
    },
    energetic : {
        type : Number,
        default : 0
    },
    cranky : {
        type : Number,
        default : 0
     },    
     moodSwings : {
        type : Number,
        default : 0
     },    
     irritated : {
        type : Number,
        default : 0
     },    
     sad : {
        type : Number,
        default : 0
     },    
     anxiety : {
        type : Number,
        default : 0
     },    
     depressed  : {
        type : Number,
        default : 0
     },    
     obsessiveThoughts : {
        type : Number,
        default : 0
     },    
     apathetic : {
        type : Number,
        default : 0
     },    
     confused: {
        type : Number,
        default : 0
     },    
     selfCritical: {
        type : Number,
        default : 0
     },    
     angry : {
        type : Number,
        default : 0
     },    
     confident : {
        type : Number,
        default : 0
     },    
     emotional: {
        type : Number,
        default : 0
     },    
     frustrated : {
        type : Number,
        default : 0
     },    
     highSexDrive : {
        type : Number,
        default : 0
     },    
     lowSexDrive: {
        type : Number,
        default : 0
     },    
     sleepy : {
        type : Number,
        default : 0
     },    
     lazy : {
        type : Number,
        default : 0
     },
     Date : {
         type : Date
     }
});

const symptomsSchema = new mongoose.Schema({
    pelvisPain : {
        type : Number,
        default : 0
    },
    headache : {
        type : Number,
        default : 0
    },
    bloating : {
        type : Number,
        default : 0
    },
    constipation : {
        type : Number,
        default : 0
    },
    headache : {
        type : Number,
        default : 0
    },
    diarrhea : {
        type : Number,
        default : 0
    },
    premenstrualSyndrome  : {
        type : Number,
        default : 0
    },
    gas : {
        type : Number,
        default : 0
    },
    cramps : {
        type : Number,
        default : 0
    },
    tenderBreast : {
        type : Number,
        default : 0
    },
    acne : {
        type : Number,
        default : 0
    },
    backAche : {
        type : Number,
        default : 0
    },
    nausea : {
        type : Number,
        default : 0
    },
    fatigue : {
        type : Number,
        default : 0
    },
    craving : {
        type : Number,
        default : 0
    },
    insomnia : {
        type : Number,
        default : 0
    },
    vaginalDischarge : {
        type : Number,
        default : 0
    },
    hotFlashes : {
        type : Number,
        default : 0
    },
    ovulationPain  : {
        type : Number,
        default : 0
    },
    highBloodPressure : {
        type : Number,
        default : 0
    },
    lowBloodPressure : {
        type : Number,
        default : 0
    },
    dizzy : {
        type : Number,
        default : 0
    },
    fever : {
        type : Number,
        default : 0
    },
    vaginalItching : {
        type : Number,
        default : 0
    },
    history : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'symptomsHistory'
    }],
    Date : {
        type : Date,
        default : Date.now
    }
});

const symptomsHistorySchema = new mongoose.Schema({
    pelvisPain : {
        type : Number,
        default : 0
    },
    headache : {
        type : Number,
        default : 0
    },
    bloating : {
        type : Number,
        default : 0
    },
    constipation : {
        type : Number,
        default : 0
    },
    headache : {
        type : Number,
        default : 0
    },
    diarrhea : {
        type : Number,
        default : 0
    },
    premenstrualSyndrome  : {
        type : Number,
        default : 0
    },
    gas : {
        type : Number,
        default : 0
    },
    cramps : {
        type : Number,
        default : 0
    },
    tenderBreast : {
        type : Number,
        default : 0
    },
    acne : {
        type : Number,
        default : 0
    },
    backAche : {
        type : Number,
        default : 0
    },
    nausea : {
        type : Number,
        default : 0
    },
    fatigue : {
        type : Number,
        default : 0
    },
    craving : {
        type : Number,
        default : 0
    },
    insomnia : {
        type : Number,
        default : 0
    },
    vaginalDischarge : {
        type : Number,
        default : 0
    },
    hotFlashes : {
        type : Number,
        default : 0
    },
    ovulationPain  : {
        type : Number,
        default : 0
    },
    highBloodPressure : {
        type : Number,
        default : 0
    },
    lowBloodPressure : {
        type : Number,
        default : 0
    },
    dizzy : {
        type : Number,
        default : 0
    },
    fever : {
        type : Number,
        default : 0
    },
    vaginalItching : {
        type : Number,
        default : 0
    },
    Date : {
        type : Date
    }
});

const moods = mongoose.model('moods', moodsSchema);
const symptoms = mongoose.model('symptoms', symptomsSchema);
const moodsHistory = mongoose.model('moodsHistory', moodsHistorySchema);
const symptomsHistory = mongoose.model('symptomsHistory', symptomsHistorySchema);
module.exports = {moods, symptoms, moodsHistory, symptomsHistory};