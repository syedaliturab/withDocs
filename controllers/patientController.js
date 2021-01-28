const { get} = require('../routes/userRoutes.js');
const  {patient, patientRelative} = require('./../models/patientModel.js');
const {moods, moodsHistory, symptoms, symptomsHistory} = require('../models/moodsAndSymptomsModel');
const catchAsynsc = require('./../utils/catchAsync');
const { compare } = require('bcryptjs');

//to get Patient
exports.getAllPatientProfile = catchAsynsc(
    async (req, res, next) => {

        const Patient = await patient.find();
        res.status(200).json({
            status: 'success',
            data: Patient
            
        });
    }
);

//to get Patient by id
exports.getPatient = catchAsynsc(
    async (req, res, next) => {

        const Patient = await patient.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: Patient
            
        })
    }
);

//to create Patient profile
exports.createPatientProfile = catchAsynsc(
    async (req, res, next) => {

        const newpatient = await patient.create(req.body);
        newpatient.password = undefined;
        res.status(200).json({
            status: 'success',
            data: newpatient
        });
    }
);

//to update Patient details
exports.updatePatientProfile = catchAsynsc(
    async (req, res, next) => {

        if (req.body.password || req.body.confirmPassword) {
            return res.json({
                status: 'fail'
            })
        }
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

//to delete Patient profile
exports.deletePatientProfile = catchAsynsc( 
    async (req, res, next) => {
    
        const deletepatient = await patient.findByIdAndRemove(req.params.id);

        res.status(200).json({
            status: 'success',
            data:  deletepatient
        })
    }
);

exports.createPatientRelativeProfile = catchAsynsc(
    async (req, res, next) => {
        const getPatient = await patient.findById(req.params.id);
        const createPatientRelative = await patientRelative.create(req.body);

        await getPatient.relatives.push(createPatientRelative);

        await getPatient.save();
        res.status(200).json({
            status : 'success',
            data : getPatient
        })
        
    }
);

exports.getPatientRelativeProfile = catchAsynsc(
    async(req, res, next) =>{
        const getPatientRelative = await patientRelative.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getPatientRelative
        })
    }
)

exports.updatePatientRelativeProfile = catchAsynsc(
    async (req, res, next) => {
        const updatePatientRelative = await patientRelative.findByIdAndUpdate(
            req.params.id, req.body, {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            status : 'success',
            data : updatePatientRelative
        })
    }
);

exports.deletePatientRelativeProfile = catchAsynsc(
    async (req, res, next) =>{
        const deletePatientRelative = await patientRelative.findByIdAndRemove(req.params.id);

        res.status(200).json({
            status : 'success',
            data : deletePatientRelative
        })
    }
);

exports.createmoods = catchAsynsc(
    async(req, res, next) =>{
        const getPatient = await patient.findById(req.params.id);
        console.log(getPatient.gender)
        if(getPatient.gender === 'female')
        {
            console.log("aaaaaaaaaa")
            const createInfo = await moods.create(req.body);
            getPatient.moods = createInfo;
        }
        getPatient.save();
        res.status(200).json({
            status : 'success',
            data : getPatient
        });
    }
);

exports.getmoods = catchAsynsc(
    async(req, res, next) => {
        const getData = await moods.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.updatemoods= catchAsynsc(
    async(req, res, next) => {
        const getData = await moods.findById(req.params.id);
        getData.history.push(getData);
        getData.save();
        const updateData = await moods.findByIdAndUpdate(
            req.params.id, req.data, {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            status : 'success',
            data : updateData
        })
    }
);

exports.getAllMoodHistory = catchAsynsc(
    async(req, res, next) => {
        const getAllmoods = await moods.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data : getAllmoods.history
        });
    }
)

exports.createSymptoms = catchAsynsc(
    async(req, res, next) =>{
        const getPatient = await patient.findById(req.params.id);
        if(getPatient.gender === 'female')
        {
            const createInfo = await symptoms.create(req.body);
            getPatient.symptoms = createInfo;
        }
        getPatient.save();
        res.status(200).json({
            status : 'success',
            data : getPatient
        });
    }
);

exports.getSymptoms = catchAsynsc(
    async(req, res, next) => {
        const getData = await symptoms.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.updateSymptoms= catchAsynsc(
    async(req, res, next) => {
        const getData = await symptoms.findById(req.params.id);
        getData.history.push(getData);
        getData.save();
        const updateData = await symptoms.findByIdAndUpdate(
            req.params.id, req.data, {
                new : true,
                runValidators : true
            }
        )
        console.log(getData);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.getmoodsHistory = catchAsynsc(
    async(req, res, next) => {
        const getData = await moods.findById(req.params.id);
        console.log(getData);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
)