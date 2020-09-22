const catchAsynsc = require('./../utils/catchAsync');
const docUser = require("../models/doctorModel");
const clinics = require("../models/clinicModel");
const Specialities = require("../models/collegeModel");




exports.getSearch = catchAsynsc(
    async (req, res, next) => {
    var regex = new RegExp(req.query["term"],'^[A-Z]');
    
    var doctorInfo = docUser.find(
        { 'name': regex }
  ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);
    
  var result1 = [];    
  
    doctorInfo.exec(function(err,data){
      // console.log(data);
        var result2 = [];
        result1.push(result2);
        if(!err){
            if(data && data.length && data.length >0){
            data.forEach(foundInfo=>{
                let obj ={
                    id: foundInfo._id,
                    name: foundInfo.name
                };
                result2.push(obj.name);
                foundInfo.visits +=1;
                foundInfo.save();
            });
        }
    }
    else{
        console.log(err);
    }
    });

    var foundclinics = clinics.find( 
          { 'clinicName': regex }
        ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);
        foundclinics.exec(function(err,data){
        // console.log(data);
            var result3 = [];
            result1.push(result3);
            if(!err){
                if(data && data.length && data.length >0){
                data.forEach(foundInfo=>{
                    let obj ={
                        id: foundInfo._id,
                        name: foundInfo.clinicName
                    };
                    result3.push(obj.name);
                    foundInfo.visits +=1;
                    foundInfo.save();
                });
            }
        }
        else{
            console.log(err);
        }
    });

    var foundspecialities = Specialities.find(
          { 'primarySpeciality': regex }
        ).sort({"updated_at":-1}).sort({"created_at" : -1}).sort({visits: -1}).limit(5);
        foundspecialities.exec(function(err,data){
        // console.log(data);
            var result4 = [];
            result1.push(result4);
            if(!err){
                if(data && data.length && data.length >0){
                data.forEach(foundInfo=>{
                    let obj ={
                        id: foundInfo._id,
                        name: foundInfo.primarySpeciality
                    };
                    result4.push(obj.name);
                    foundInfo.visits +=1;
                    foundInfo.save();
                });
            }
            res.jsonp(result1);
        }
        else{
            console.log(err);
        }
    });
  });