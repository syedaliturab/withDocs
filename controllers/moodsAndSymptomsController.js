const  {patient, patientRelative} = require('./../models/patientModel.js');
const {moods, moodsHistory, symptoms, symptomsHistory} = require('../models/moodsAndSymptomsModel');
const catchAsynsc = require('./../utils/catchAsync');

exports.createmoods = catchAsynsc(
    async(req, res, next) =>{
        const getPatient = await patient.findById(req.params.id);
        console.log(getPatient.gender)
        if(getPatient.gender === 'female')
        {
            const createInfo = await moods.create(req.body);
            getPatient.moods = createInfo;
        }
        await getPatient.save();
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
        const getData = await moods.findById(req.params.id);
        const createHistory = await moodsHistory.create(getData);
        getData.history.push(createHistory);
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

exports.getMoodsHistory = catchAsynsc(
    async(req, res, next) => {
        const getData = await moodsHistory.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.getAllMoodHistory = catchAsynsc(
    async(req, res, next) => {
        const getmoods = await moods.findById(req.params.id);

        var history = [];

        for(var element of getmoods.history){
            const getHistoryMood = await moodsHistory.findById(history.id);
            history.push(getHistoryMood);
        }
        res.status(200).json({
            status : 'success',
            data : history
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
        const getData = await symptoms.findById(req.params.id);
        const createHistory = await symptomsHistory.create(getData);
        getData.history.push(createHistory);
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
            data : updateData
        })
    }
);

exports.getSymptomsHistory = catchAsynsc(
    async(req, res, next) => {
        const getData = await symptomsHistory.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.getAllSymptomsHistory = catchAsynsc(
    async(req, res, next) => {
        const getSymptoms = await symptoms.findById(req.params.id);

        var history = [];

        for(var element of getSymptoms.history){
            const getHistorySymptoms = await symptomsHistory.findById(element.id);
            history.push(getHistorySymptoms);
        }
        res.status(200).json({
            status : 'success',
            data : history
        });
    }
)