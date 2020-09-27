const catchAsynsc = require('./../utils/catchAsync');
const docUser = require("../models/doctorModel");
const clinics = require("../models/clinicModel");
const Specialities = require("../models/collegeModel");




exports.getSearch = catchAsynsc(
    async (req, res, next) => {
    var regex = new RegExp('^(?:' + req.query.term + ')', 'i');
    
    var doctorInfo = docUser.find(
        { 'name': regex }
  ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);
    var specialityInfo = docUser.find(
        { 'primarySpeciality': regex }
  ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);

    var clinicInfo = clinics.find(
    { 'clinicName': regex }
    ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);

    var result1 = [];
    var result2 = [];
    result1.push(result2);
    var result3 = [];
    var result4 = [];
    result1.push(result3);
    result1.push(result4);

    doctorInfo.exec(function(err,data){
    
    if(!err){
        if(data && data.length && data.length >0){
        data.forEach(foundInfo=>{
            let obj ={
                id: foundInfo._id,
                label: foundInfo.name,
            };
            foundInfo.visits +=1;
            console.log(foundInfo.visits);
            foundInfo.save();
            result2.push(obj.label);
        });
    }
    }
    else{
    console.log(err);
    }
    });
    specialityInfo.exec(function(err,data){
    
    if(!err){
        if(data && data.length && data.length >0){
        data.forEach(foundInfo=>{
            let obj ={
                id: foundInfo._id,
                label: foundInfo.primarySpeciality,
            };
            foundInfo.visits +=1;
            // console.log(foundInfo.visits);
            foundInfo.save();
            result4.push(obj.label);
        });
    }
    }
    else{
    console.log(err);
    }
    });

    clinicInfo.exec(function(err,data){
    if(!err){
        if(data && data.length && data.length >0){
        data.forEach(foundClinicInfo=>{
            let obj2 ={
                id: foundClinicInfo._id,
                name: foundClinicInfo.clinicName,
            };
            foundClinicInfo.visits +=1;
            console.log(foundClinicInfo.visits);
            foundClinicInfo.save();
            result3.push(obj2.name);
            console.log(obj2.name)
        });
        console.log(result1);
    }
    res.jsonp(result1);
    }
    else{
    console.log(err);
    }
    });
    // var foundspecialities = Specialities.find(
    //       { 'primarySpeciality': regex }
    //     ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);
    //     foundspecialities.exec(function(err,data){
    //     // console.log(data);
    //         var result4 = [];
    //         result1.push(result4);
    //         if(!err){
    //             if(data && data.length && data.length >0){
    //             data.forEach(foundInfo=>{
    //                 let obj ={
    //                     id: foundInfo._id,
    //                     name: foundInfo.primarySpeciality
    //                 };
    //                 result4.push(obj.name);
    //                 foundInfo.visits +=1;
    //                 foundInfo.save();
    //             });
    //         }
    //         res.jsonp(result1);
    //     }
    //     else{
    //         console.log(err);
    //     }
    // });
  });