const { get, use} = require('../routes/userRoutes.js');
const  {patient, patientRelative} = require('./../models/patientModel.js');
const {moods, moodsHistory, symptoms, symptomsHistory} = require('../models/moodsAndSymptomsModel');
const catchAsynsc = require('./../utils/catchAsync');
const { compare } = require('bcryptjs');
const sendEmail = require('./../utils/email');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');


//to get Patient
exports.getAllPatientProfile = catchAsynsc(
    async (req, res, next) => {

        const Patient = await patient.find();
        res.status(200).json({
            status: 'success',
            data: Patient
            
        });
    }
);

//to get Patient by id
exports.getPatient = catchAsynsc(
    async (req, res, next) => {

        const Patient = await patient.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: Patient
            
        })
    }
);

//to create Patient profile
exports.createPatientProfile = catchAsynsc(
    async (req, res, next) => {

        const newpatient = await patient.create(req.body);
        newpatient.password = undefined;
        newpatient.emailVerificationStatus = false;
        res.status(200).json({
            status: 'success',
            data: newpatient
        });
    }
);

// //to create Patient profile
// exports.createPatientProfile = catchAsynsc(
//     async (req, res, next) => {
//         uploadImage( req, res, async ( error ) => {
//             console.log(req.file)
//             if( error ){
//                 console.log( 'errors', error );
//                 res.json( { error: error } );
//             } else {
//                 // If File not found
//                 if( req.file === undefined ){
//                 console.log( 'Error: No File Selected!' );
//                 res.json( 'Error: No File Selected' );
//             } else {
//                 req.body.image = req.file.location;
//                 const newpatient = await patient.create(req.body);
//                 newpatient.password = undefined;
//                 newpatient.emailVerificationStatus = false;
//                 res.status(200).json({
//                     status: 'success',
//                     data: newpatient
//                 });
//             }
//             }
//         });
//     }
// );

//to update Patient details
exports.updatePatientProfile = catchAsynsc(
    async (req, res, next) => {

        if (req.body.password || req.body.confirmPassword) {
            return res.json({
                status: 'fail'
            })
        }
        const updatedpatient = await patient.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            data: updatedpatient
            
        })
    }
);

//to delete Patient profile
exports.deletePatientProfile = catchAsynsc( 
    async (req, res, next) => {
    
        const deletepatient = await patient.findByIdAndRemove(req.params.id);

        res.status(200).json({
            status: 'success',
            data:  deletepatient
        })
    }
);

exports.verifyEmail = catchAsynsc(
    async (req, res, next) => {
        const getPatient = await patient.findById(req.params.id);
        console.log(getPatient);
        const name = getPatient.name;
        const email = getPatient.email;
        console.log(email);

        const token = jwt.sign({name, email}, process.env.JWT_ACC_ACTIVATE, {expiresIn : '20m'});
        console.log(token);
        try {
            await sendEmail({
              email: getPatient.email,
              subject: 'Account acivation Link',
              html: `<a href = "http://localhost:3000/api/v11/user/patient/activate/${token}">Click me</a>`
            });
        
            res.status(200).json({
              status: 'success',
              message: 'Token sent to email!'
            });
          } catch (err) {
        
            return next(
              new AppError('There was an error sending the email. Try again later!'),
              500
            );
          }
    }
)

exports.emailActivate = catchAsynsc(
    async(req, res, next) =>{
        const token = req.params.id;
        console.log(token);
        if(token){
            jwt.verify(token, process.env.JWT_ACC_ACTIVATE, async (err, decodedToken) => {
                if(err){
                    return res.status(400).json({error : "expired"});
                }else{
                    const{name, email} = decodedToken;
                    await patient.findOne({email}).exec((err, user) => {
                        if(err){
                            console.log(err);
                            return res.status(400).json({error : "Could not find user with this email Id"});
                        }
                        else{
                            if(user.emailVerificationStatus)
                            {
                                return res.json({error : "Already Verified"});
                            }
                            else{
                                user.emailVerificationStatus = true;
                                user.save((err, success) =>{
                                    if(err)
                                    {
                                        console.log("error in signup while account activation", err);
                                        return res.status(400).json({error : "Error actiavation account"});
                                    }
                                    else{
                                        res.json({
                                            message : "Sign up success"
                                        })
                                    }
                                })
                            }
                        }
                        
                    });
                }
            })
        }else{
            res.json({error : "Something went wrong"});
        }
    }
)

exports.createPatientRelativeProfile = catchAsynsc(
    async (req, res, next) => {
        const getPatient = await patient.findById(req.params.id);
        const createPatientRelative = await patientRelative.create(req.body);

        await getPatient.relatives.push(createPatientRelative);

        await getPatient.save();
        res.status(200).json({
            status : 'success',
            data : getPatient
        })
        
    }
);

// exports.createPatientRelativeProfile = catchAsynsc(
//     async (req, res, next) => {uploadImage( req, res, async ( error ) => {
//         console.log(req.file)
//         if( error ){
//             console.log( 'errors', error );
//             res.json( { error: error } );
//         } else {
//             // If File not found
//             if( req.file === undefined ){
//             console.log( 'Error: No File Selected!' );
//             res.json( 'Error: No File Selected' );
//         } else {
//             req.body.image = req.file.location;
//             const getPatient = await patient.findById(req.params.id);
//             const createPatientRelative = await patientRelative.create(req.body);

//             await getPatient.relatives.push(createPatientRelative);

//             await getPatient.save();
//             res.status(200).json({
//                 status : 'success',
//                 data : getPatient
//             })
//         }
//     }
// });
        
//     }
// );

exports.getPatientRelativeProfile = catchAsynsc(
    async(req, res, next) =>{
        const getPatientRelative = await patientRelative.findById(req.params.id);
        res.status(200).json({
            status : 'success',
            data : getPatientRelative
        })
    }
)

exports.updatePatientRelativeProfile = catchAsynsc(
    async (req, res, next) => {
        const updatePatientRelative = await patientRelative.findByIdAndUpdate(
            req.params.id, req.body, {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            status : 'success',
            data : updatePatientRelative
        })
    }
);

exports.deletePatientRelativeProfile = catchAsynsc(
    async (req, res, next) =>{
        const deletePatientRelative = await patientRelative.findByIdAndRemove(req.params.id);

        res.status(200).json({
            status : 'success',
            data : deletePatientRelative
        })
    }
);

