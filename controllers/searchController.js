const catchAsynsc = require('./../utils/catchAsync');
const docUser = require("../models/doctorModel");
const clinics = require("../models/clinicModel");
const { visits, city } = require('../models/clinicSingleModel');
const { distinct } = require('../models/doctorModel');
const { compare } = require('bcryptjs');
const { doc } = require('prettier');


exports.getSearch = catchAsynsc(
    async (req, res, next) => {
    const regex = await {$regex: req.query.keyword, $options: 'i' };
    
    const doctorInfo = await docUser.find(
            {'name': regex},
            // {'city' : 'OAKLAND'}
            // {
            //     $or: [
            //         {'subLocality' : 12},
            //         {'locality' : 1}
            //     ]
            // }
    ).sort({visits: -1}).limit(5);

    if(req.query.keyword != null)
    {    
        // to find clinicname from clinic collections 
        var specialityInfo = await docUser.find(
        { 'primarySpeciality': regex }
        ).limit(5);
    }else{
        // to find clinicname from clinic collections 
        var specialityInfo = await docUser.find().limit(5);
    }

    // to find clinicname from clinic collections 
    const clinicName = await clinics.find(
        {'clinicOne.clinicName': regex},
        // {'city' : 'OAKLAND'},
        // {
        //     $and: [
        //     {'subLocality' : 11},
        //     {'locality' : 1}
        //     ]
        // }
    ).sort({visits: -1}).limit(5);

    if(req.query.keyword != null)
    {    
        // to find clinicname from clinic collections 
        var clinicIssue = await clinics.find(
        { 'clinicOne.clinicIssues': regex }
        ).sort({visits: -1}).limit(5);
    }else{
        // to find clinicname from clinic collections 
        var clinicIssue = await clinics.find().sort({visits: -1}).limit(5);
    }

    var result = [];
    var result1 = [];
    var result2 = [];
    var result3 = [];
    var result4 = [];

    result.push(result1, result2, result3, result4);

    await doctorInfo.forEach(foundInfo=>{
        let obj ={
            id: foundInfo._id,
            label: foundInfo.name
        };
        foundInfo.visits +=1;
        foundInfo.save();
        result2.push(foundInfo.name);
    });

    await specialityInfo.forEach(foundInfo=>{
        let obj ={
            id: foundInfo._id,
            label: foundInfo.primarySpeciality
        };
        result1.push(obj.label);
    });

    await clinicName.forEach(foundInfo=>{
        let obj ={
            id: foundInfo._id,
            label: foundInfo.clinicOne.clinicName
        };
        foundInfo.visits +=1;
        foundInfo.save();
        result3.push(obj.label);
    });

    await clinicIssue.forEach(foundInfo=>{
        let obj ={
            id: foundInfo._id,
            label: foundInfo.clinicOne.clinicIssues
        };
        result4.push(obj.label);
    });

    res.status(200).jsonp({
        status : 'success',
        data : result
    });
});



exports.getDoctorSearch = catchAsynsc(
    async(req, res, next) =>{
        const regexDoctor = await {$regex: req.query.keyword, $options: 'i' };
        
        var resultDoctor = [];

        const doctorResult = await docUser.find(
            {'name' : regexDoctor}
        ).sort({visits : -1});

        await doctorResult.forEach(foundInfo=>{
            let obj = {
                id : foundInfo._id,
                label : foundInfo.name
            }
                resultDoctor.push(foundInfo.name)
            })
        res.status(200).jsonp({
            status : 'success',
            data : resultDoctor
        });
});

exports.getClinicSearch = catchAsynsc(
    async(req, res, next) =>{
        const regexClinic = await {$regex: req.query.keyword, $options: 'i' };
        
        var resultClinic = [];

        // to find clinicname from clinic collections 
        const clinicName = await clinics.find(
            {'clinicOne.clinicName': regexClinic},
            // {'city' : 'OAKLAND'},
            // {
            //     $and: [
            //     {'subLocality' : 11},
            //     {'locality' : 1}
            //     ]
            // }
        ).sort({visits: -1});

        await clinicName.forEach(foundInfo=>{
            let obj ={
                id: foundInfo._id,
                label: foundInfo.clinicOne.clinicName
            };
            resultClinic.push(obj.label);
        });
        res.status(200).jsonp({
            status : 'success',
            data : resultClinic
        });
});
        