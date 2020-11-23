const catchAsynsc = require('./../utils/catchAsync');
const {primarySpeciality,subSpeciality,clinicServices,clinicIssues} = require('./../models/specialitiesModel.js');


exports.createPrimarySpeciality = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await primarySpeciality.create(element);
            console.log(member);
        }
        //const speciality = await primarySpeciality.create(req.body);
        res.status(200).json({
            status: 'success',
            data: req.body
        });
    }
);


exports.createClinicIssues = catchAsynsc(
    async (req, res, next) => {
        
        for(var element of req.body.data){
            const member = await clinicIssues.create(element);
            console.log(member);
        }
        //const issue = await clinicIssues.create(req.body);
        res.status(200).json({
            status: 'success',
            data: issue
        });
    }
);

exports.getSpecialities = catchAsynsc(
    async (req, res, next) => {

        var data = [];
        if(req.body.filter === "primarySpeciality"){
            data = await primarySpeciality.find({},{ primarySpeciality: 1, _id: 0 } );
        }
        else if(req.body.filter === "subSpeciality"){
            data = await subSpeciality.find({},{ subSpeciality: 1, _id: 0 } );
        }
        else if(req.body.filter === "clinicServices"){
            data = await clinicIssues.find({},{ clinicServices: 1, _id: 0 } );
        }
        else if(req.body.filter === "clinicIssues"){
            data = await clinicIssues.find({},{ clinicIssues: 1, _id: 0 } );
        }
        res.status(200).json({
            status: 'success',
            data: data
        });
    }
);
