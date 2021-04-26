const catchAsynsc = require('./../utils/catchAsync');
const {patientSetting, patientSettingHistory, inputSetting, padSetting, periodAlertSetting, periodEndSetting, ovulationSetting, pillsSetting, contraceptionSetting} = require('../models/patientSettingModel');
const {patient}  = require('../models/patientModel');

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

// ----------------------------- Input Settings -------------------------------------

exports.createinputSetting = catchAsynsc(
    async (req, res, next) => {

        const inputSettingInfo = await inputSetting.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.input = inputSettingInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status: 'success',
            data: inputSettingInfo
        });
    }
);

exports.getAllInputSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await inputSetting.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getInputSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await inputSetting.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// ----------------------------- Sanitary Pad Settings -------------------------------------

exports.createpadSetting = catchAsynsc(
    async (req, res, next) => {
        
        const padSettingInfo = await padSetting.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.sanitaryPads = padSettingInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status: 'success',
            data: padSettingInfo
        });
    }
);

exports.getAllPadSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await padSetting.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getPadSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await padSetting.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// ----------------------------- Period Alert Settings -------------------------------------

exports.createperiodAlertSetting = catchAsynsc(
    async (req, res, next) => {
        
        const periodAlertSettingInfo = await periodAlertSetting.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.periodAlert =periodAlertSettingInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status: 'success',
            data: periodAlertSettingInfo
        });
    }
);

exports.getAllperiodAlertSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await periodAlertSetting.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getperiodAlertSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await periodAlertSetting.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// ----------------------------- Period End Settings -------------------------------------

exports.createperiodEndSetting = catchAsynsc(
    async (req, res, next) => {
        
        const periodEndSettingInfo = await periodEndSetting.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.periodEnd =periodEndSettingInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status: 'success',
            data: periodEndSettingInfo
        });
    }
);

exports.getAllperiodEndSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await periodEndSetting.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getperiodEndSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await periodEndSetting.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// ----------------------------- Ovulation Settings -------------------------------------

exports.createovulationSetting = catchAsynsc(
    async (req, res, next) => {
        
        const ovulationSettingInfo = await ovulationSetting.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.ovulation =ovulationSettingInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status: 'success',
            data: ovulationSettingInfo
        });
    }
);

exports.getAllovulationSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await ovulationSetting.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getovulationSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await ovulationSetting.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// ----------------------------- Pills Settings -------------------------------------

exports.createpillsSetting = catchAsynsc(
    async (req, res, next) => {
        
        const pillsSettingInfo = await pillsSetting.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.pills =pillsSettingInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status: 'success',
            data: pillsSettingInfo
        });
    }
);

exports.getAllpillsSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await pillsSetting.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getpillsSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await pillsSetting.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

// ----------------------------- Contraception Settings -------------------------------------

exports.createcontraceptionSetting = catchAsynsc(
    async (req, res, next) => {
        
        const contraceptionSettingInfo = await contraceptionSetting.create(req.body);
        const getPatientInfo = await patient.findById(req.body.patientId);
        
        getPatientInfo.contraception =contraceptionSettingInfo;
        await getPatientInfo.save();
        res.status(200).json({
            status: 'success',
            data: contraceptionSettingInfo
        });
    }
);

exports.getAllcontraceptionSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await contraceptionSetting.find({patientId: req.params.id});
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);

exports.getcontraceptionSetting = catchAsynsc(
    async(req, res, next) => {
        const getInfo = await contraceptionSetting.findById(req.params.id);
        
        res.status(200).json({
            status : 'success',
            data: getInfo
        })
    }
);