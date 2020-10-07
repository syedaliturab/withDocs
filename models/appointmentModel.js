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
        requried: true,
    },
    slot: {
        type: String,
        requried: true,
    },
    status: {
        type: String,
        enum: ['active', 'confirmed', 'cancelled','pushed'],
        default: 'active'
    },
    doctorName: {
        type: String,
        requried: true,
    },
    patientName: {
        type: String,
        requried: true,
    },
});

const appointments = mongoose.model('Appointments',appointmentSchema);
module.exports = appointments;