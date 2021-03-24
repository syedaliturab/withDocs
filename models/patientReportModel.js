const mongoose = require("mongoose");
const validator = require('validator');

const reportModel = new mongoose.Schema({
    regularAndIrregular : {
        regularCount : Number,
        irregularCount : Number,
        Date : {
            type : Date,
            default : Date.now
        }
    },
    intimacy : {
        protectedCount : Number,
        unProtectedCount : Number,
        Date : {
            type : Date,
            default : Date.now
        }
    },
    flow : {
        light : Number,
        medium : Number,
        heavy : Number,
        spotting : Number,
        Date : {
            type : Date,
            default : Date.now
        }
    }
});