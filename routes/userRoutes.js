const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const doctorController = require('./../controllers/doctorController');
const clinicController = require('./../controllers/clinicController');
const collegeController = require('./../controllers/collegeController');
const patientController = require('./../controllers/patientController');
const imageController = require('./../controllers/imageController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
//router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

//router.use(authController.restrictTo('admin'));


router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);



router
  .route('/doctor')
  .get(doctorController.getAllDocProfile)
  .post(doctorController.createDocProfile);

router
  .route('/doctor/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDocProfile);

  
router
  .route('/patient')
  .get(patientController.getAllPatientProfile)
  .post(patientController.createPatientProfile);


router
  .route('/patient/:id')
  .get(patientController.getPatient)
  .patch(patientController.updatePatientProfile);


router.get('/clinic',clinicController.getAllClinicProfile);
router.get('/clinic/:id',clinicController.getClinic);
router.post('/clinic',clinicController.createClinicProfile);
router.patch('/clinic/:id',clinicController.updateClinicDetail);


  

router
  .route('/college')
  .get(collegeController.getAllCollegeNames)
  .post(collegeController.addCollegeNames);


router
  .route('/college/:id')
  .post(collegeController.deleteCollegeNames);

router
  .route('/image')
  .get(imageController.getImage)
  .post(imageController.uploadImage);


router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router;