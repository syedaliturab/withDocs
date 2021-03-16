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