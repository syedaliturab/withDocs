const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const doctorController = require('./../controllers/doctorController');
const clinicController = require('./../controllers/clinicController');
const collegeController = require('./../controllers/collegeController');
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
  .route('/profile')
  .get(doctorController.getAllDocProfile)
  .post(doctorController.createDocProfile);
router.get('/profile/:id',doctorController.getDoctor);

router.get('/clinic',clinicController.getAllClinicProfile);
router.get('/clinic/:id',clinicController.getClinic);
router.post('/clinic',clinicController.createClinicProfile);
router.patch('/clinic/:id',clinicController.updateClinicDetail);

router.post('/appointment/:id',clinicController.bookAppointment);
  

router
  .route('/college')
  .get(collegeController.getAllCollegeNames)
  .post(collegeController.addCollegeNames);


router
  .route('/college/:id')
  .post(collegeController.deleteCollegeNames);

router.get('/image/:id',imageController.getImage)
router.post('/image',imageController.uploadImage);


router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router;