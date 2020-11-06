const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const doctorController = require('./../controllers/doctorController');
const clinicController = require('./../controllers/clinicController');
const collegeController = require('./../controllers/collegeController');
const feedbackController = require('./../controllers/feedbackController');
const searchController = require('./../controllers/searchController');

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
  .route('/doctor/')
  .get(doctorController.getDoctor)
  .post(doctorController.createDocProfile)
  .patch(doctorController.updateDocProfile);

router
  .route('/clinic/')
  .get(clinicController.getClinic)
  .post(clinicController.createClinicProfile)
  .patch(clinicController.updateClinicProfile);

router.post('/college',collegeController.createCollegeName);
router.post('/degree',collegeController.createDegree);
router.post('/education',collegeController.getCollegeAndDegree);

router
  .route('/membership')
  .get(collegeController.getMemberships)
  .post(collegeController.createMembership);

router
  .route('/specialitie')
  .post(collegeController.getSpecialities)
  .patch(collegeController.createSpecialitie);


router.get('/search/',userController.getUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/feedback/')
  .get(feedbackController.getFeedback)
  .post(feedbackController.createFeedback)
  .patch(feedbackController.updateFeedback)  
  .delete(feedbackController.deleteFeedback)  

router
  .route('/feedback/reply/')
  .get(feedbackController.getReply)
  .post(feedbackController.createReply)
  .patch(feedbackController.updateReply)  
  .delete(feedbackController.deleteReply)
  
router
  .route('/search/autoComplete')
  .get(searchController.getSearch)  

router
  .route('/search/doctor')
  .get(searchController.getDoctorSearch)  

router
  .route('/search/clinics')
  .get(searchController.getClinicSearch)  

router
  .route('/feedback/reaction/')
  .post(feedbackController.postReaction)  

module.exports = router;