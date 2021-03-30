const catchAsynsc = require('./../utils/catchAsync');
const {patientReport, patientReportHistory} = require('../models/patientReportModel');
const { patient } = require('../models/patientModel');

exports.patientReport = catchAsynsc(
    async (req, res, next) => {

        const patientReportInfo = await patientReport.create(req.body);
        res.status(200).json({
            status: 'success',
            data: patientReportInfo
        });
    }
);

exports.getPatientReport = catchAsynsc(
    async(req, res, next) => {
        const getPatientInfo = await patientReport.find(req.body.id);

        res.status(200).json({
            status: 'success',
            data: getPatientInfo
        });
    }
);

exports.updatePatientReport = catchAsynsc(
    async(req, res, next) => {
        const updateData = await patientReport.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            status: 'success',
            data: updateData
        });
    }
);

exports.createReportHistory= catchAsynsc(
    async(req, res, next) => {
        const getData = await patientReport.findById(req.params.id);
        const createHistory = await patientReportHistory.create(getData);
        getData.history.push(createHistory);
        getData.save();
        const updateData = await patientReport.findByIdAndUpdate(
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

exports.getReportHistory = catchAsynsc(
    async(req, res, next) => {
        const getData = await patientReportHistory.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getData
        })
    }
);

exports.updateReportHistory = catchAsynsc(
    async(req, res, next) => {
        const updateData = await patientReportHistory.findByIdAndUpdate(
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

exports.getAllReportHistory = catchAsynsc(
    async(req, res, next) => {
        const getReportHistory = await patientReport.findById(req.params.id);

        var history = [];

        for(var element of getReportHistory.history){
            const getReportHistory = await patientReportHistory.findById(element.id);
            history.push(getReportHistory);
        }
        res.status(200).json({
            status : 'success',
            data : history
        });
    }
)