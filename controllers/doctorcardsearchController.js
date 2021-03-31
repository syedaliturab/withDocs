const catchAsynsc = require("./../utils/catchAsync");
const docUser = require("../models/doctorModel");
const { compareSync } = require("bcryptjs");
const { find } = require("../models/doctorModel");
const { Feedback } = require("../models/feedbackModel");
const clinic = require("../models/clinicModel");
const  {patient, patientRelative} = require('./../models/patientModel.js');
const { QueryCursor } = require("mongoose");


exports.getdoctorcardSearch = catchAsynsc(
    
    async (req, res, next) => {
        var result = [];
        function ltThirty(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1); 
            var a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
              ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            if(d<30){
                return true;
            }
            else{
                return false;
            }
          }
          
          function deg2rad(deg) {
            return deg * (Math.PI/180)
          }

          
        const doctorInfo = await docUser.find({
            // $and:[
            //     {
                $or: [
                { name: { $regex: req.body.keyword, $options: 'i' }},
                {primarySpeciality: { $regex: req.body.keyword, $options: 'i' }}
                ]
                // },
                // {
                //     Display Clinics Data (<30km) radius.
                // }
        // ]
        } 
        );
        const cc = await clinic.find({});
    //     const pc = await patient.find({_id:"Nach"});
    //     var arr=[];
    //     cc.forEach(function(n){
    //         if(ltThirty(n.latitude, n.longitude, pc.latitude, pc.longitude)){
    //             const get_data = await docUser.find({_id:"{n._id}"})
    //             arr.push([get_data])
    //     }
    // });
        

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