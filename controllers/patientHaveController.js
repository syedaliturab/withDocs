const catchAsynsc = require('./../utils/catchAsync');
const {pain, allergies, injuries, surgeries, chronicDiseases, heridatoryDiseases, currentMedications, pastMedications} = require('../models/patientHaveModel');


exports.createPain = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await pain.create(element);
            console.log(member);
        }
        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllPain = catchAsynsc(
    async (req, res, next) => {

        const painInfo = await pain.find({});
        
        var painlist = []
        painInfo.forEach(element => {
            painlist.push(element.pain);
        })
        res.status(200).json({
            status: 'success',
            data: painlist
        });
    }
);

exports.createAllergies = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await allergies.create(element);
            console.log(member);
        }

        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllAllergies = catchAsynsc(
    async (req, res, next) => {
        const allergiesInfo = await allergies.find({});
        
        var allergieslist = []
        allergiesInfo.forEach(element => {
            allergieslist.push(element.allergies);
        })
        res.status(200).json({
            status: 'success',
            data: allergieslist
        });
    }
);

exports.createInjuries = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await injuries.create(element);
            console.log(member);
        }

        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllInjuries = catchAsynsc(
    async (req, res, next) => {
        const injuriesInfo = await injuries.find({});
        
        var injurieslist = []
        injuriesInfo.forEach(element => {
            injurieslist.push(element.injuries);
        })
        res.status(200).json({
            status: 'success',
            data: injurieslist
        });
    }
);
exports.createSurgeries = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await surgeries.create(element);
            console.log(member);
        }

        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllSurgeries = catchAsynsc(
    async (req, res, next) => {
        const surgeriesInfo = await surgeries.find({});
        
        var surgerieslist = []
        surgeriesInfo.forEach(element => {
            surgerieslist.push(element.surgeries);
        })
        res.status(200).json({
            status: 'success',
            data: surgerieslist
        });
    }
);

exports.createChronicDiseases = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await chronicDiseases.create(element);
            console.log(member);
        }

        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllChronicDiseases = catchAsynsc(
    async (req, res, next) => {
        const getInfo = await chronicDiseases.find({});
        
        var getlist = []
        getInfo.forEach(element => {
            getlist.push(element.chronicDiseases);
        })
        res.status(200).json({
            status: 'success',
            data: getlist
        });
    }
);


exports.createHeridatoryDiseases = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await heridatoryDiseases.create(element);
            console.log(member);
        }

        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllHeridatoryDiseases = catchAsynsc(
    async (req, res, next) => {
        const getInfo = await heridatoryDiseases.find({});
        
        var getlist = []
        getInfo.forEach(element => {
            getlist.push(element.heridatoryDiseases);
        })
        res.status(200).json({
            status: 'success',
            data: getlist
        });
    }
);

exports.createCurrentMedications = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await currentMedications.create(element);
            console.log(member);
        }

        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllCurrentMedications = catchAsynsc(
    async (req, res, next) => {
        const getInfo = await currentMedications.find({});
        
        var getlist = []
        getInfo.forEach(element => {
            getlist.push(element.currentMedications);
        })
        res.status(200).json({
            status: 'success',
            data: getlist
        });
    }
);

exports.createPastMedications = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await pastMedications.create(element);
            console.log(member);
        }

        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);

exports.getAllPastMedications = catchAsynsc(
    async (req, res, next) => {
        const getInfo = await pastMedications.find({});
        
        var getlist = []
        getInfo.forEach(element => {
            getlist.push(element.pastMedications);
        })
        res.status(200).json({
            status: 'success',
            data: getlist
        });
    }
);
