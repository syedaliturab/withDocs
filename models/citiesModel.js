const mongoose = require('mongoose');

const topCities = mongoose.model('topCities', mongoose.Schema({
    topCity: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
}))

const otherCities = mongoose.model('otherCities', mongoose.Schema({
    otherCity: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
}))


module.exports = {topCities,otherCities};

