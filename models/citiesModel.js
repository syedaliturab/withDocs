const mongoose = require('mongoose');

const topCitiesSchema = new mongoose.Schema({
    topCity: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
});

const otherCitiesSchema = new mongoose.Schema({
    otherCity: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
})

const toplocalitiesSchema = new mongoose.Schema({
    topLocality: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }
})

const otherlocalitiesSchema = new mongoose.Schema({
    otherLocality: {
        type: String,
        required: true,
        unique: true
    },
    trend: {
        type: Number,
        default: 0
    }

})

const topCities = mongoose.model('topCities', topCitiesSchema)
const otherCities = mongoose.model('otherCities', otherCitiesSchema)
const toplocalities = mongoose.model('toplocalities', toplocalitiesSchema)
const otherlocalities = mongoose.model('otherlocalities', otherlocalitiesSchema)

module.exports = {topCities, otherCities, toplocalities, otherlocalities};
