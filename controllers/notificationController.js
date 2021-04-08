const appointment = require('./../models/appointmentModel.js');
const catchAsynsc = require('./../utils/catchAsync');
const {Feedback, Reply, Reaction} = require('../models/feedbackModel');
const  {patient, patientRelative} = require('./../models/patientModel.js');
const doctors = require('./../models/doctorModel.js');
const clinic = require('./../models/clinicModel.js');

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

        var totalAppointments=[];
        // For Appointment Details
        const patientAppointments = await appointment.find({patientId: req.query.id, status: "confirmed"});
        totalAppointments.push(patientAppointments)
        // For Clinic Details
        for (const foundInfo of patientAppointments){
        const clinicInfo = await clinic.findById({_id : foundInfo.clinicId})
            if(clinicInfo == null)
            {
                var obj = {}
            }
            else{
                var obj = {
                    clinicOneName : clinicInfo.clinicOne.clinicName,
                    clinicOneFees : clinicInfo.clinicOne.consultationFees,
                    clinicOneAddress : clinicInfo.clinicOne.address,
                    // clinicOneDescription : clinicInfo.clinicOne.description,

                    clinicTwoName : clinicInfo.clinicTwo.clinicName,
                    clinicTwoAddress : clinicInfo.clinicTwo.address,
                    clinicTwoFees : clinicInfo.clinicTwo.consultationFees,
                    // clinicTwoDescription : clinicInfo.clinicTwo.description
                }
            }
            totalAppointments.push(obj)
        }
            // For Doctor Details
            for (const foundInfo of patientAppointments){
            const doctorInfo = await doctors.findById({_id : foundInfo.doctorId})
            if(doctorInfo == null)
            {
                var obj1 = {}
            }
            else{
                var obj1 = {
                    doctorSpecialties : doctorInfo.specialities,
                    doctorCity : doctorInfo.city,
                    doctorState : doctorInfo.state,
                    doctorDesc : doctorInfo.description,
                    doctorExperience : doctorInfo.experience
                }
            }
            totalAppointments.push(obj1)

        }
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 

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
        var totalAppointments=[];
        // For Appointment Details
        const patientAppointments = await appointment.find({patientId: req.query.id, status: "pushed"});
        totalAppointments.push(patientAppointments)
        // For Clinic Details
        for (const foundInfo of patientAppointments){
        const clinicInfo = await clinic.findById({_id : foundInfo.clinicId})
            if(clinicInfo == null)
            {
                var obj = {}
            }
            else{
                var obj = {
                    clinicOneName : clinicInfo.clinicOne.clinicName,
                    clinicOneFees : clinicInfo.clinicOne.consultationFees,
                    clinicOneAddress : clinicInfo.clinicOne.address,
                    // clinicOneDescription : clinicInfo.clinicOne.description,

                    clinicTwoName : clinicInfo.clinicTwo.clinicName,
                    clinicTwoAddress : clinicInfo.clinicTwo.address,
                    clinicTwoFees : clinicInfo.clinicTwo.consultationFees,
                    // clinicTwoDescription : clinicInfo.clinicTwo.description
                }
            }
            totalAppointments.push(obj)
        }
            // For Doctor Details
            for (const foundInfo of patientAppointments){
            const doctorInfo = await doctors.findById({_id : foundInfo.doctorId})
            if(doctorInfo == null)
            {
                var obj1 = {}
            }
            else{
                var obj1 = {
                    doctorSpecialties : doctorInfo.specialities,
                    doctorCity : doctorInfo.city,
                    doctorState : doctorInfo.state,
                    doctorDesc : doctorInfo.description,
                    doctorExperience : doctorInfo.experience
                }
            }
            totalAppointments.push(obj1)

        }
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
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
        var totalAppointments=[];
        // For Appointment Details
        const patientAppointments = await appointment.find({patientId: req.query.id, status: "active"});
        totalAppointments.push(patientAppointments)
        // For Clinic Details
        for (const foundInfo of patientAppointments){
        const clinicInfo = await clinic.findById({_id : foundInfo.clinicId})
            if(clinicInfo == null)
            {
                var obj = {}
            }
            else{
                var obj = {
                    clinicOneName : clinicInfo.clinicOne.clinicName,
                    clinicOneFees : clinicInfo.clinicOne.consultationFees,
                    clinicOneAddress : clinicInfo.clinicOne.address,
                    // clinicOneDescription : clinicInfo.clinicOne.description,

                    clinicTwoName : clinicInfo.clinicTwo.clinicName,
                    clinicTwoAddress : clinicInfo.clinicTwo.address,
                    clinicTwoFees : clinicInfo.clinicTwo.consultationFees,
                    // clinicTwoDescription : clinicInfo.clinicTwo.description
                }
            }
            totalAppointments.push(obj)
        }
            // For Doctor Details
            for (const foundInfo of patientAppointments){
            const doctorInfo = await doctors.findById({_id : foundInfo.doctorId})
            if(doctorInfo == null)
            {
                var obj1 = {}
            }
            else{
                var obj1 = {
                    doctorSpecialties : doctorInfo.specialities,
                    doctorCity : doctorInfo.city,
                    doctorState : doctorInfo.state,
                    doctorDesc : doctorInfo.description,
                    doctorExperience : doctorInfo.experience
                }
            }
            totalAppointments.push(obj1)

        }
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
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
        var totalAppointments=[];
        // For Appointment Details
        const patientAppointments = await appointment.find({patientId: req.query.id, status: "cancelled"});
        totalAppointments.push(patientAppointments)
        // For Clinic Details
        for (const foundInfo of patientAppointments){
        const clinicInfo = await clinic.findById({_id : foundInfo.clinicId})
            if(clinicInfo == null)
            {
                var obj = {}
            }
            else{
                var obj = {
                    clinicOneName : clinicInfo.clinicOne.clinicName,
                    clinicOneFees : clinicInfo.clinicOne.consultationFees,
                    clinicOneAddress : clinicInfo.clinicOne.address,
                    // clinicOneDescription : clinicInfo.clinicOne.description,

                    clinicTwoName : clinicInfo.clinicTwo.clinicName,
                    clinicTwoAddress : clinicInfo.clinicTwo.address,
                    clinicTwoFees : clinicInfo.clinicTwo.consultationFees,
                    // clinicTwoDescription : clinicInfo.clinicTwo.description

                }
            }
            totalAppointments.push(obj)
        }
            // For Doctor Details
            for (const foundInfo of patientAppointments){
            const doctorInfo = await doctors.findById({_id : foundInfo.doctorId})
            if(doctorInfo == null)
            {
                var obj1 = {}
            }
            else{
                var obj1 = {
                    doctorSpecialties : doctorInfo.specialities,
                    doctorCity : doctorInfo.city,
                    doctorState : doctorInfo.state,
                    doctorDesc : doctorInfo.description,
                    doctorExperience : doctorInfo.experience
                }
            }
            totalAppointments.push(obj1)

        }
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
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
        
        
        var allFeedbacks=[];
        
        // For Patient Feedbacks 
        const Feedbacks = await Feedback.find({patientId: req.query.id});
        allFeedbacks.push(Feedbacks)
        // For Appointment Details
        const patientAppointments = await appointment.find({_id: Feedbacks.appointmentId, status: "confirmed"});
        allFeedbacks.push(patientAppointments)
        // For Clinic Details
        for (const foundInfo of Feedbacks){
        const clinicInfo = await clinic.findById({_id : foundInfo.doctorId})
            if(clinicInfo == null)
            {
                var obj = {}
            }
            else{
                var obj = {
                    clinicOneName : clinicInfo.clinicOne.clinicName,
                    clinicOneFees : clinicInfo.clinicOne.consultationFees,
                    clinicOneAddress : clinicInfo.clinicOne.address,
                    // clinicOneDescription : clinicInfo.clinicOne.description,

                    clinicTwoName : clinicInfo.clinicTwo.clinicName,
                    clinicTwoAddress : clinicInfo.clinicTwo.address,
                    clinicTwoFees : clinicInfo.clinicTwo.consultationFees,
                    // clinicTwoDescription : clinicInfo.clinicTwo.description

                }
            }
            allFeedbacks.push(obj)
        }
            // For Doctor Details
            for (const foundInfo of Feedbacks){
            const doctorInfo = await doctors.findById({_id : foundInfo.doctorId})
            if(doctorInfo == null)
            {
                var obj1 = {}
            }
            else{
                var obj1 = {
                    doctorSpecialties : doctorInfo.specialities,
                    doctorCity : doctorInfo.city,
                    doctorState : doctorInfo.state,
                    doctorDesc : doctorInfo.description,
                    doctorExperience : doctorInfo.experience
                }
            }
            allFeedbacks.push(obj1)

        }
        const getPatientRelatives = await patientRelative.find({patientId: req.query.id}) 
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
