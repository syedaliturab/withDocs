const docUser = require('./../models/doctorModel.js');
const catchAsynsc = require('./../utils/catchAsync');

//to get doctors
exports.getAllDocProfile = catchAsynsc(
    async (req, res, next) => {

        const doctors = await docUser.find();
        res.status(200).json({
            status: 'success',
            data: doctors
            
        });
    }
);

//to get doctor by id
exports.getDoctor = catchAsynsc(
    async (req, res, next) => {

        const docter = await docUser.findById(req.query.id);
        res.status(200).json({
            status: 'success',
            data: docter
            
        })
    }
);

//to create docter profile
exports.createDocProfile = catchAsynsc(
    async (req, res, next) => {
        const newDocUser = await docUser.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newDocUser
        });
    }
);



//to update docter details
exports.updateDocProfile = catchAsynsc(
    async (req, res, next) => {

        if (req.body.password || req.body.confirmPassword) {
            return res.json({
                status: 'fail'
            })
        }

        const updatedDocUser = await docUser.findByIdAndUpdate(
            req.body.id, req.body, {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            data: updatedDocUser
            
        })
    }
);

//to delete docter profile
exports.deleteDocProfile = catchAsynsc( 
    async (req, res, next) => {
    
        console.log(req.params.id);
        const deleteDocUser = await docUser.findByIdAndRemove(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data:  deleteDocUser
        })
    }
);



