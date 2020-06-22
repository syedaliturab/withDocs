const docUser = require('./../models/userDocModel.js');
const apiFeatures = require('./../utils/apiFeatures');
const catchAsynsc = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
//to get doctors
exports.getAllDocUsers = catchAsynsc(
    async (req, res, next) => {

        const que = new apiFeatures(docUser.find(), req.query)
            .filter()
            .sort()
            .limitField()
            .paginate();


        const docUsers = await que.query;
        res.status(200).json({
            status: 'success',
            results: docUsers.length,
            data: {
                doctors: docUsers
            }
        })
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
    })

//to create docter profile
exports.createDocUser = catchAsynsc(
    async (req, res, next) => {

        const newDocUser = await docUser.create(req.body);
        const token = jwt.sign({
            id: newDocUser._id
        }, process.env.JWT_SECRET_DOCTOR, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        newDocUser.password = undefined;
        res.status(201).json({
            status: 'success',
            data: {
                token,
                doctor: newDocUser
            }
        });
    })

//to update docter details

exports.updateDocUser = catchAsynsc(
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
    })


//to delete docter
exports.deleteDocUser = async (req, res, next) => {
    try {

    } catch (err) {

    }
}