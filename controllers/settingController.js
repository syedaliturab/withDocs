const catchAsynsc = require('./../utils/catchAsync');
const patientSetting = require('../models/patientSettingModel');
const patient  = require('../models/patientModel');

exports.createPatientSetting = catchAsynsc(
    async (req, res, next) => {

        const patientSettingInfo = await patientSetting.create(req.body);
        res.status(200).json({
            status: 'success',
            data: patientSettingInfo
        });
    }
);

exports.getPatientSetting = catchAsynsc(
    async(req, res, next) => {
        const getPatientSettingInfo = await patientSetting.findById(req.body.id);
        const getPatientProfileInfo = await patient.findById(req.body.id);

        let result = {
            getPatientSettingInfo : getPatientSettingInfo,
            image : getPatientProfileInfo.image,
            age : getPatientProfileInfo.age,
            height : getPatientProfileInfo.height,
            weight : getPatientProfileInfo.weight
        }

        res.status(200).json({
            status: 'success',
            data: result
        });
    }
);