const docUser = require('./../models/doctorModel.js');
const catchAsynsc = require('./../utils/catchAsync');

//to get doctors
exports.getAllDocProfile = catchAsynsc(
    async (req, res, next) => {

        const doctor = await docUser.find();
        res.status(200).json({
            status: 'success',
            results: doctor.length,
            data: {
                doctor,
            },
        });
    }
);

//to get doctor by id
exports.getDoctor = catchAsynsc(
    async (req, res, next) => {

        const docter = await docUser.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                docter
            }
        })
    }
);

//to create docter profile
exports.createDocProfile = catchAsynsc(
    async (req, res, next) => {

        const newDocUser = await docUser.create(req.body);
        newDocUser.password = undefined;
        res.status(201).json({
            status: 'success',
            data: {
                doctor: newDocUser
            }
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
        console.log(req.params.id)
        const updatedDocUser = await docUser.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            data: {
                docter: updatedDocUser
            }
        })
    }
);

//to delete docter profile
exports.deleteDocProfile = catchAsynsc( 
    async (req, res, next) => {
    
        console.log(req.params.id)
        const deleteDocUser = await docUser.findByIdAndRemove(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: {
                doctor: deleteDocUser
            }
        })
    }
);