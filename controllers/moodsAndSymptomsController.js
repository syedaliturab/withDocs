const  {patient, patientRelative} = require('./../models/patientModel.js');
const {moods, moodsHistory, symptoms, symptomsHistory} = require('../models/moodsAndSymptomsModel');
const catchAsynsc = require('./../utils/catchAsync');

exports.createmoods = catchAsynsc(
    async(req, res, next) =>{
        const getPatient = await patient.findById(req.body.patientId);
        if(getPatient.gender === 'female')
        {
            const createInfo = await moods.create(req.body);
            getPatient.moods = createInfo;
            await getPatient.save();
        }
        
        res.status(200).json({
            status : 'success',
            data : getPatient
        });
    }
);

exports.getmoods = catchAsynsc(
    async(req, res, next) => {
        const getData = await moods.findById(req.params.id);
        // getData.history = [];
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.updatemoods= catchAsynsc(
    async(req, res, next) => {
        
        const updateData = await moods.findByIdAndUpdate(
            req.body.id, req.body, {
                new : true,
                runValidators : true
            }
        );
        
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.moods = updateData;
        await getPatientInfo.save();
        
        res.status(200).json({
            status : 'success',
            data : updateData
        })
    }
);

exports.deleteMoods = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await moods.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllMoods = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await moods.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// --------------------------- Symptoms --------------------------------

exports.createSymptoms = catchAsynsc(
    async(req, res, next) =>{
        const getPatient = await patient.findById(req.body.patientId);
        if(getPatient.gender === 'female')
        {
            const createInfo = await symptoms.create(req.body);
            getPatient.symptoms = createInfo;
            await getPatient.save();
        }
        res.status(200).json({
            status : 'success',
            data : getPatient
        });
    }
);

exports.getSymptoms = catchAsynsc(
    async(req, res, next) => {
        const getData = await symptoms.findById(req.params.id);
        // console.log()
        getData.history = [];
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.updateSymptoms= catchAsynsc(
    async(req, res, next) => {
        const updateData = await symptoms.findByIdAndUpdate(
            req.body.id, req.body, {
                new : true,
                runValidators : true
            }
        );
        
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.symptoms = updateData;
        await getPatientInfo.save();
        res.status(200).json({
            status : 'success',
            data : updateData
        })
    }
);

exports.deleteSymptoms = catchAsynsc(
    async(req, res, next) => {
        const deleteInfo = await symptoms.findByIdAndRemove(req.body.id);
        
        res.status(200).json({
            status : 'success',
            data: deleteInfo
        })
    }
);

exports.getAllSymptoms = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await symptoms.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);