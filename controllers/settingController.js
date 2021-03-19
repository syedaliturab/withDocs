const catchAsynsc = require('./../utils/catchAsync');
const {patientSetting, patientSettingHistory} = require('../models/patientSettingModel');
const patient  = require('../models/patientModel');

exports.createPatientSetting = catchAsynsc(
    async (req, res, next) => {

        const patientSettingInfo = await patientSetting.create(req.body);
        var sanitaryPad = patientSettingInfo.reminder.before.sanitaryPads;
        var periodalert = patientSettingInfo.reminder.before.periodAlert;
        if(sanitaryPad.pads == true || sanitaryPad.tampons == true || sanitaryPad.cloths == true)
        {
            sanitaryPad.sanitaryPads = true
        }
        // if(periodalert.remindMeAt == true || periodalert.tampons == true || periodalert.cloths == true)
        // {
        //     periodalert.sanitaryPads = true
        // }

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

exports.updatePatientSettings = catchAsynsc(
    async(req, res, next) => {
        var sanitaryPad = req.body.reminder.before.sanitaryPads;
        var periodalert = req.body.reminder.before.periodAlert;
        if(sanitaryPad.pads == true || sanitaryPad.tampons == true || sanitaryPad.cloths == true)
        {
            sanitaryPad.sanitaryPads = true
        }
        const updateData = await patientSetting.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            status : 'success',
            data : updateData
        })
    }
)

exports.createSettingsHistory= catchAsynsc(
    async(req, res, next) => {
        const getData = await patientSetting.findById(req.params.id);
        const createHistory = await patientSettingHistory.create(getData);
        getData.history.push(createHistory);
        getData.save();
        const updateData = await patientSetting.findByIdAndUpdate(
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

exports.getSettingsHistory = catchAsynsc(
    async(req, res, next) => {
        const getData = await patientSettingHistory.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.updateSettingsHistory = catchAsynsc(
    async(req, res, next) => {
        const updateData = await patientSettingHistory.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            status : 'success',
            data : updateData
        })
    }
)

exports.getAllSettingsHistory = catchAsynsc(
    async(req, res, next) => {
        const getsettings = await patientSetting.findById(req.params.id);

        var history = [];

        for(var element of getsettings.history){
            const getHistorySettings = await patientSettingHistory.findById(element.id);
            history.push(getHistorySettings);
        }
        res.status(200).json({
            status : 'success',
            data : history
        });
    }
)