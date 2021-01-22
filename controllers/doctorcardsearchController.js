const catchAsynsc = require("./../utils/catchAsync");
const docUser = require("../models/doctorModel");
const { compareSync } = require("bcryptjs");
const { find } = require("../models/doctorModel");
const { Feedback } = require("../models/feedbackModel");
const clinic = require("../models/clinicModel")

exports.getdoctorcardSearch = catchAsynsc(
    async (req, res, next) => {
        var result = [];

        const doctorInfo = await docUser.find({
            $or: [
                { name: { $regex: req.body.keyword, $options: 'i' }},
                {primarySpeciality: { $regex: req.body.keyword, $options: 'i' }}
            ]
        } 
        );

        await doctorInfo.forEach(async (foundInfo) => {
            result.push(foundInfo)
        });

        res.status(200).jsonp({
            status: 'success',
            data : result
        });
    }
)

exports.doctorprofile = catchAsynsc(
    async (req, res, next) => {
        var result = []

        const doctorInfo = await docUser.find({_id : req.query.id});
        const feedbackInfo = await Feedback.find({doctorId : req.query.id});
        const clinicInfo = await clinic.find({ _id : req.query.id});
        
        result.push(doctorInfo, clinicInfo, feedbackInfo)
        
        res.status(200).jsonp({
            status : 'success',
            data : result
        })
    }
)