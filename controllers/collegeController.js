const college = require('./../models/collegeModel.js');
const catchAsynsc = require('./../utils/catchAsync');

//to get college names
exports.getAllCollegeNames = catchAsynsc(
    async (req, res, next) => {

        const collegeNames = await college.find();
        res.status(200).json({
            status: 'success',
            data: collegeNames,
            
        });
    }
);



//to add college names
exports.addCollegeNames = catchAsynsc(
    async (req, res, next) => {

        const collegeNames = await college.create(req.body);
        res.status(200).json({
            status: 'success',
            data: collegeNames
        });
    }
);

//to delete college Names
exports.deleteCollegeNames = catchAsynsc( 
    async (req, res, next) => {
    
        console.log(req.params.id);
        const deleteCollege = await college.findByIdAndRemove(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: deleteCollege
        })
    }
);