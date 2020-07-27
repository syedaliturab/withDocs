const { Mongoose } = require("mongoose");
const { appointment } = require("./clinicSingleModel");

mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    doctorId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    clinicId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    patientId: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    date: {
        type: String,
    },
    slot: {
        type: Number
    },
    status: {
        type: String,
        enum: ['active', 'confirmed', 'cancelled','pushed'],
        default: 'active'
    },
    doctorName: {
        type: String
    },
    patientName: {
        type: String
    },
});

const appointments = mongoose.model('Appointments',appointmentSchema);
module.exports = appointments;