const appointment = require('./../models/appointmentModel.js');
const catchAsynsc = require('./../utils/catchAsync');
const {Feedback, Reply, Reaction} = require('../models/feedbackModel');

//to get appointments by patient's id
// for patient relative, put the relative's ID as the patientID 
exports.getAppointments = catchAsynsc(
    async (req, res, next) => {
        console.log(req.query)
        const appointments = await appointment.find({patientId: req.query.id});
        
        res.status(200).json({
            status: 'success',
            data: appointments            
        })
    }
);

exports.getFeedback = catchAsynsc(
    async (req, res, next) => {
      
        const Feedbacks = await Feedback.find({patientId: req.query.id});
        res.status(200).json({
            status: 'success',
            data: Feedbacks
            
        })
    }
);
