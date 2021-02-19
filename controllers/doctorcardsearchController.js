const catchAsynsc = require("./../utils/catchAsync");
const docUser = require("../models/doctorModel");
const { compareSync } = require("bcryptjs");
const { find } = require("../models/doctorModel");
const { Feedback } = require("../models/feedbackModel");
const clinic = require("../models/clinicModel");

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
        for (const foundInfo of doctorInfo){
            const clinicInfo = await clinic.findById({_id : foundInfo.id})
            if(clinicInfo == null)
            {
                var obj = {}
            }
            else{
                var obj = {
                    clinicFirstName : clinicInfo.clinicOne.clinicName,
                    clinicFirstFees : clinicInfo.clinicOne.consultationFees,
                    clinicTwoName : clinicInfo.clinicTwo.clinicName,
                    clinicTwoFees : clinicInfo.clinicTwo.consultationFees
                }
            }
            result.push([foundInfo, obj]);
        }
        await res.status(200).jsonp({
            status: 'success',
            data : result
        });
    }
)

exports.doctorprofile = catchAsynsc(
    async (req, res, next) => {
        var result = [];
        var clinicArray = [];
        const doctorInfo = await docUser.find({_id : req.query.id});
        const feedbackInfo = await Feedback.find({doctorId : req.query.id});
        const clinicInfo = await clinic.find({ _id : req.query.id});
        clinicArray.push(clinicInfo[0].clinicOne, clinicInfo[0].clinicTwo);
        let obj = {
            clinicDetails : clinicArray
        }
        result.push(doctorInfo[0], obj, feedbackInfo)
        res.status(200).jsonp({
            status : 'success',
            data : result
        })
    }
)