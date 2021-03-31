const appointment = require('./../models/appointmentModel.js');
const catchAsynsc = require('./../utils/catchAsync');
const {Feedback, Reply, Reaction} = require('../models/feedbackModel');
const  {patient, patientRelative} = require('./../models/patientModel.js');

//to get appointments by patient's id
// for patient relative, put the relative's ID as the patientID 
exports.getAppointments = catchAsynsc(
    async (req, res, next) => {
        const patientAppointments = await appointment.find({patientId: req.query.id});
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
        var totalAppointments=[];
        totalAppointments.push(patientAppointments)
        for(var element of getPatientRelatives){
            var patientRelativeAppointments = await appointment.find({patientId: element.relativeId});
            totalAppointments.push(patientRelativeAppointments);
        }
        res.status(200).json({
            status: 'success',
            data: totalAppointments            
        })
    }
);

exports.getConfirmedAppointments = catchAsynsc(
    async (req, res, next) => {
        const patientAppointments = await appointment.find({patientId: req.query.id, status: confirmed});
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
        var totalAppointments=[];
        totalAppointments.push(patientAppointments)
        for(var element of getPatientRelatives){
            var patientRelativeAppointments = await appointment.find({patientId: element.relativeId});
            totalAppointments.push(patientRelativeAppointments);
        }
        res.status(200).json({
            status: 'success',
            data: totalAppointments            
        })
    }
);

exports.getPushedAppointments = catchAsynsc(
    async (req, res, next) => {
        const patientAppointments = await appointment.find({patientId: req.query.id, status: pushed});
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
        var totalAppointments=[];
        totalAppointments.push(patientAppointments)
        for(var element of getPatientRelatives){
            var patientRelativeAppointments = await appointment.find({patientId: element.relativeId});
            totalAppointments.push(patientRelativeAppointments);
        }
        res.status(200).json({
            status: 'success',
            data: totalAppointments            
        })
    }
);

exports.getActiveAppointments = catchAsynsc(
    async (req, res, next) => {
        const patientAppointments = await appointment.find({patientId: req.query.id, status: active});
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
        var totalAppointments=[];
        totalAppointments.push(patientAppointments)
        for(var element of getPatientRelatives){
            var patientRelativeAppointments = await appointment.find({patientId: element.relativeId});
            totalAppointments.push(patientRelativeAppointments);
        }
        res.status(200).json({
            status: 'success',
            data: totalAppointments            
        })
    }
);

exports.getCancelledAppointments = catchAsynsc(
    async (req, res, next) => {
        const patientAppointments = await appointment.find({patientId: req.query.id, status: cancelled});
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
        var totalAppointments=[];
        totalAppointments.push(patientAppointments)
        for(var element of getPatientRelatives){
            var patientRelativeAppointments = await appointment.find({patientId: element.relativeId});
            totalAppointments.push(patientRelativeAppointments);
        }
        res.status(200).json({
            status: 'success',
            data: totalAppointments            
        })
    }
);


exports.getFeedback = catchAsynsc(
    async (req, res, next) => {
      
        const Feedbacks = await Feedback.find({patientId: req.query.id});
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
        var allFeedbacks=[];
        allFeedbacks.push(Feedbacks)
        for(var element of getPatientRelatives){
            var patientRelativeFeedbacks = await appointment.find({patientId: element.relativeId});
            allFeedbacks.push(patientRelativeFeedbacks);
        }
        res.status(200).json({
            status: 'success',
            data: allFeedbacks
            
        })
    }
);
