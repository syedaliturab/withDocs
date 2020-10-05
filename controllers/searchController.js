const catchAsynsc = require('./../utils/catchAsync');
const docUser = require("../models/doctorModel");
const clinics = require("../models/clinicModel");
const { visits } = require('../models/clinicSingleModel');
const { distinct } = require('../models/doctorModel');


exports.getSearch = catchAsynsc(
    async (req, res, next) => {
    var regex = new RegExp('^(?:' + req.query.term + ')', 'i');
    
    // to find doctor name from doctor collections
    var doctorInfo = docUser.find(
        { 'name': regex }
  ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);

//     var specialityInfo = docUser.find(
//         { 'primarySpeciality': regex }
//   ).sort({"updated_at":-1}).distinct('primarySpeciality').sort({"created_at" : -1}).sort({visits: -1}).limit(5);

// to find speciality from doctors collections
var specialityInfo = docUser.aggregate([
    {
        $match: {'primarySpeciality': regex}
    },
    {
        $sort: {
            updated_at: -1,
            created_at: -1
            // visits: -1
        }
    },
    {
        $group: {
            _id: null,
            primaries: {$addToSet: "$primarySpeciality"}
        }
    },
    {
        $project: {
            primaries: {
                $slice: ["$primaries", 5]
            }
        }
    }
])

    // to find clinicname from clinic collections 
    var clinicInfo = clinics.find(
    { 'clinicOne.clinicName': regex }
    ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);

    var result = [];
    var result1 = [];
    var result2 = [];
    var result3 = [];
    result.push(result1, result2, result3);

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
            // docUser.findByIdAndUpdate(obj.id, { $inc: { visits: 1 }});
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
    // console.log(data);
    if(!err){
        if(data && data.length && data.length >0){
        data.forEach(foundInfo=>{
            let obj ={
                id: foundInfo._id,
                label: foundInfo.primaries[0]
            };
            // foundInfo.visit +=1;
            // console.log(foundInfo.visit);
            // docUser.findByIdAndUpdate(obj.id, foundInfo.visits);
            // docUser.findByIdAndUpdate(obj.id, { $inc: { visits: 1 }});
            // docUser.findByIdAndUpdate(obj.id, { visits : foundInfo.visits}, {new : true, runValidators : true});
            
            // foundInfo.save(function(err, data){
            //     if(err){
            //         console.log(err);
            //     }else{
            //         console.log(data);
            //     }
            // });
            // console.log(obj.label);
            result1.push(obj.label);
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
                name: foundClinicInfo.clinicOne.clinicName,
            };
            foundClinicInfo.clinicOne.visits +=1;
            console.log(foundClinicInfo.visits);
            foundClinicInfo.save();
            // foundClinicInfo.update();
            // clinics.findByIdAndUpdate(obj2.id, foundClinicInfo.visits);
            clinics.findByIdAndUpdate(obj.id, { visits : foundClinicInfo.visits}, {new : true, runValidators : true});

            result3.push(obj2.name);
            console.log(obj2.name)
        });
        console.log(result1);
    }
    res.jsonp(result);
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