const appointment = require('../models/appointmentModel.js');
const catchAsynsc = require('../utils/catchAsync');

//to get appointments by patient's id
exports.getAppointments = catchAsynsc(
    async (req, res, next) => {
        console.log(req.query.id)
        const appointments = await appointment.find({patientId: req.query.id});
        
        res.status(200).json({
            status: 'success',
            data: appointments
            
        })
    }
);