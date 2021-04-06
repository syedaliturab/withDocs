const { get, use} = require('../routes/userRoutes.js');
const  {patient, patientRelative} = require('./../models/patientModel.js');
const catchAsynsc = require('./../utils/catchAsync');
const { compare } = require('bcryptjs');
const sendEmail = require('./../utils/email');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

exports.createPatientProfile = catchAsynsc(
    async (req, res, next) => {

        const newpatient = await patient.create(req.body);
        newpatient.password = undefined;
        newpatient.emailVerificationStatus = false;
        res.status(200).json({
            status: 'success',
            data: newpatient
        });
    }
);

exports.createPatientRelativeProfile = catchAsynsc(
    async (req, res, next) => {
        const createPatientRelative = await patientRelative.create(req.body);

        res.status(200).json({
            status : 'success',
            data : createPatientRelative
        })
        
    }
);

exports.updatePatientProfile = catchAsynsc(
    async (req, res, next) => {

        // if (req.body.password || req.body.confirmPassword) {
        //     return res.json({
        //         status: 'fail'
        //     })
        // }
        const updatedpatient = await patient.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            data: updatedpatient
            
        })
    }
);