const catchAsynsc = require('./../utils/catchAsync');
const {CollegeNames, DegreeNames, MembershipNames, Specialities} = require('./../models/collegeModel.js');

exports.createSpecialitie = catchAsynsc(
    async (req, res, next) => {
        
        const specialitie = await Specialities.create(req.body);
        res.status(200).json({
            status: 'success',
            data: specialitie
        });
    }
);

exports.getSpecialities = catchAsynsc(
    async (req, res, next) => {
        console.log(req.body.filter);
        var specialitielist = []
        if(req.body.filter === "primarySpeciality"){
            members = await Specialities.find({},{ primarySpeciality: 1, _id: 0 } );
            members.forEach(element => {
                if(element.primarySpeciality)
                    specialitielist.push(element.primarySpeciality);
            })
            
        }
        if(req.body.filter === "subSpeciality"){
            members = await Specialities.find({},{ subSpeciality: 1, _id: 0 } );
            members.forEach(element => {
                if(element.subSpeciality)
                    specialitielist.push(element.subSpeciality);
            })
            
        }
        if(req.body.filter === "clinicServices"){
            members = await Specialities.find({},{ clinicServices: 1, _id: 0 } );
            members.forEach(element => {
                if(element.clinicServices)
                    specialitielist.push(element.clinicServices);
            })
            
        }
        if(req.body.filter === "clinicIssues"){
            members = await Specialities.find({},{ clinicIssues: 1, _id: 0 } );
            members.forEach(element => {
                if(element.clinicIssues)
                    specialitielist.push(element.clinicIssues);
            })
            
        }
        res.status(200).json({
            status: 'success',
            data: specialitielist
        });
    }
);

//to create college name
exports.getMemberships = catchAsynsc(
    async (req, res, next) => {

        const members = await MembershipNames.find();
        var memberlist = []
        members.forEach(element => {
            memberlist.push(element.membership);
        })
        res.status(200).json({
            status: 'success',
            data: memberlist
        });
    }
);

//to create college name
exports.createMembership = catchAsynsc(
    async (req, res, next) => {
        const member = await MembershipNames.create(req.body);
        res.status(200).json({
            status: 'success',
            data: member
        });
    }
);

//to delete college name
exports.deleteMembership = catchAsynsc(
    async (req, res, next) => {

        const college = await MembershipNames.findByIdAndRemove(req.body.id);
        res.status(200).json({
            status: 'success',
            data: college
        });
    }
);

//to get college and degree names according to request
exports.getCollegeAndDegree = catchAsynsc(
    async (req, res, next) => {
        var colleges;
        var degrees;
        if(req.body.filter === "AYUSH Practitioner"){
            colleges = await CollegeNames.find({
                speciality: {$in:["Ayurveda","Ayurvedic","Yoga and Naturopathy","Unani","Siddha","Homeopathy"]}
            });
            degrees = await DegreeNames.find({
                stream: {$in:["Ayurveda","Ayurvedic","Yoga and Naturopathy","Unani","Siddha","Homeopathy"]}
            });
        }else if(req.body.filter === "Student"){
            colleges = await CollegeNames.find();
            degrees = await DegreeNames.find();
        }else {
            colleges = await CollegeNames.find({
                speciality: req.body.filter
            });
            degrees = await DegreeNames.find({
                stream: req.body.filter
            });
        } 

        var collegelist = []
        var degreelist = []
        colleges.forEach(element => {
            collegelist.push(element.collegeName);
        })
        degrees.forEach(element => {
            degreelist.push(element.degree);
        })
        res.status(200).json({
            status: 'success',
            data: {
                college: collegelist,
                degree: degreelist
            }
        });
    }
);

//to create college name
exports.createCollegeName = catchAsynsc(
    async (req, res, next) => {
       
        const college = await CollegeNames.create(req.body);
        res.status(200).json({
            status: 'success',
            data: college
        });
    }
);

//to create degree name
exports.createDegree = catchAsynsc(
    async (req, res, next) => {
        
        const degree = await DegreeNames.create(req.body);
        res.status(200).json({
            status: 'success',
            data: degree
        });
    }
);
//to delete college name
exports.deleteCollegeName = catchAsynsc(
    async (req, res, next) => {

        const college = await CollegeNames.findByIdAndRemove(req.body.id);
        res.status(200).json({
            status: 'success',
            data: college
        });
    }
);

//to delete degree name
exports.deleteDegree = catchAsynsc(
    async (req, res, next) => {

        const degree = await DegreeNames.findByIdAndRemove(req.body.id);
        res.status(200).json({
            status: 'success',
            data: degree
        });
    }
);