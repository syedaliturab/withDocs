const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const doctorController = require('./../controllers/doctorController');
const clinicController = require('./../controllers/clinicController');
const collegeController = require('./../controllers/collegeController');
const patientController = require('./../controllers/patientController');
const imageController = require('./../controllers/imageController');
const appointmentController = require('./../controllers/appointmentController');
const feedbackController = require('./../controllers/feedbackController');
const personalizationController = require('./../controllers/personalizationController');
const specialitiesController = require('./../controllers/specialitiesController');
const doctorcardsearchController = require('./../controllers/doctorcardsearchController');
const searchController = require('./../controllers/searchController');
const haveController = require('../controllers/patientHaveController');
const patientSettings = require('../controllers/settingController');
const patientMoodsAndSymptoms = require('../controllers/moodsAndSymptomsController');
const notificationController = require('../controllers/notificationController');
const qrController = require('../controllers/qrController');
const patientReportController = require('../controllers/patientReportController');


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
  .route('/alldoctors')
  .get(doctorController.getAllDocProfile);

router
  .route('/doctor/')
  .get(doctorController.getDoctor)
  .post(doctorController.createDocProfile)
  .patch(doctorController.updateDocProfile);

router
  .route('/workinghours/')
  .get(clinicController.checkClinic);
  

// Notification Routes
router.get('/appointmentNotifications/',notificationController.getAppointments);
router.get('/feedbackNotifications/',notificationController.getFeedback);
router.get('/confirmedAppointmentNotifications/',notificationController.getConfirmedAppointments);
router.get('/cancelledAppointmentNotifications/',notificationController.getCancelledAppointments);
router.get('/pushedAppointmentNotifications/',notificationController.getPushedAppointments);
router.get('/upcomingAppointmentNotifications/',notificationController.getActiveAppointments);


  
router
  .route('/patient')
  .get(patientController.getAllPatientProfile)
  .post(patientController.createPatientProfile);

router
  .route('/patient/:id')
  .get(patientController.getPatient)
  .patch(patientController.updatePatientProfile);

router
  .route('/patient/relative')
  .post(patientController.createPatientRelativeProfile )

router
  .route('/patient/relative/:id')
  .get(patientController.getPatientRelativeProfile)
  .patch(patientController.updatePatientRelativeProfile)
  .delete(patientController.deletePatientRelativeProfile)

router.get('/clinic',clinicController.getClinic);
router.post('/clinic',clinicController.createClinicProfile);
router.patch('/clinic',clinicController.updateClinicProfile);
router.get('/clinics',clinicController.getAllClinicProfile);



router.post('/college',collegeController.createCollegeName);
router.post('/degree',collegeController.createDegree);
router.post('/education',collegeController.getCollegeAndDegree);

router
  .route('/membership')
  .get(collegeController.getMemberships)
  .post(collegeController.createMembership);

router
  .route('/specialitie')
  .post(specialitiesController.getSpecialities);

router.get('/trending',personalizationController.personalSearch);
router.get('/trendingissues/',personalizationController.trendingIssues);
router.get('/trendingspecialities/',personalizationController.trendingSpecialities);

router.post('/cities/',personalizationController.citiesSearch);
router.post('/issuesclinicsdoctors/',personalizationController.issuesClinicsDoctorsSearch);

router.post('/topcities/',personalizationController.createTopCities);
router.post('/othercities/',personalizationController.createOtherCities);
router.post('/toplocalities/',personalizationController.createTopLocalities);
router.post('/otherlocalities', personalizationController.createOtherLocalities);
router.post('/localities', personalizationController.localitySearch);

router.post('/primaryspecialitie',specialitiesController.createPrimarySpeciality);
router.post('/createsubspecialitie',specialitiesController.createSubSpeciality);
router.post('/createclinicservices',specialitiesController.createClinicServices);
router.post('/createclinicissues',specialitiesController.createClinicIssues);

router
  .route('/doctorcardSearch')
  .post(doctorcardsearchController.getdoctorcardSearch)
  
router.get('/doctorprofile', doctorcardsearchController.doctorprofile);  

router
  .route('/image')
  .get(imageController.getImage)
  .post(imageController.uploadImage);

router
  .route('/appointment')
  .post(appointmentController.bookAppointment)
  .put(appointmentController.fatchAppointment);

router.post('/appointmentworkinghours',appointmentController.getWorkingHoursByDoctorId);

router
  .route('/search/')
  .get(userController.getUser);


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
  .route('/feedback/reaction/')
  .post(feedbackController.postReaction)  

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

  router
  .route('/search/autoComplete')
  .post(searchController.getSearch)  

router
  .route('/search/doctor')
  .post(searchController.getDoctorSearch)  

router
  .route('/search/clinics')
  .post(searchController.getClinicSearch)  

router.post('/newpassword', authController.emailToUser);

router.get('/patient/verify/:id', patientController.verifyEmail);
router.get('/patient/activate/:id', patientController.emailActivate);

router.post('/createpain', haveController.createPain);
router.post('/createallergies', haveController.createAllergies);
router.post('/createinjuries', haveController.createInjuries);
router.post('/createsurgeries', haveController.createSurgeries);
router.post('/createcurrentmedications', haveController.createCurrentMedications);
router.post('/createpastmedications', haveController.createPastMedications);
router.post('/createchronicdiseases', haveController.createChronicDiseases);
router.post('/createheridatorydiseases', haveController.createHeridatoryDiseases);

router
  .route('/patient/settings')
  .post(patientSettings.createPatientSetting)
  .get(patientSettings.getPatientSetting)
  .patch(patientSettings.updatePatientSettings);

router
  .route('/patient/settingshistory')
  .post(patientSettings.createSettingsHistory)
  .get(patientSettings.getSettingsHistory)
  .patch(patientSettings.updateSettingsHistory);

router.get('/patient/allsettingshistory', patientSettings.getAllSettingsHistory);

router.post('/qrCreatePatientProfile/',qrController.createPatientProfile);
router.post('/qrCreatePatientRelativeProfile/',qrController.createPatientRelativeProfile);
router.patch('/qrVerifiedPhoneNumber/',qrController.updatePatientProfile);

router.post('/patient/regAndIrreg', patientReportController.createRegularAndIrregular);
router.get('/patient/regAndIrreg/:id', patientReportController.getRegularAndIrregular);
router.get('/patient/allRegAndIrreg/:id', patientReportController.getAllRegularAndIrregular);

router.post('/patient/flow', patientReportController.createFlow);
router.get('/patient/flow/:id', patientReportController.getFlow);
router.get('/patient/flows/:id', patientReportController.getAllFlow);

router.post('/patient/discharge', patientReportController.createDischarge);
router.get('/patient/discharge/:id', patientReportController.getDischarge);
router.get('/patient/allDischarge/:id', patientReportController.getAllDischarge);

router.post('/patient/intimacy', patientReportController.createIntimacyAndPhases);
router.get('/patient/intimacy/:id', patientReportController.getIntimacyAndPhases);
router.get('/patient/allIntimacy/:id', patientReportController.getAllIntimacyAndPhases);

router.post('/patient/pregnancy', patientReportController.createPregnancyTest);
router.get('/patient/pregnancy/:id', patientReportController.getPregnancyTest);
router.get('/patient/allpregnancy/:id', patientReportController.getAllPregnancyTest);

router.post('/patient/ovulation', patientReportController.createOvulationTest);
router.get('/patient/ovulation/:id', patientReportController.getOvulationTest);
router.get('/patient/allOvulation/:id', patientReportController.getAllOvulationTest);

router.post('/patient/note', patientReportController.createNotes);
router.get('/patient/note/:id', patientReportController.getNotes);
router.get('/patient/notes/:id', patientReportController.getAllNotes);

router.post('/patient/mood/', patientMoodsAndSymptoms.createmoods);
router.get('/patient/mood/:id', patientMoodsAndSymptoms.getmoods);
router.get('/patient/moods/:id', patientMoodsAndSymptoms.getAllMoods);

router.post('/patient/symptom/', patientMoodsAndSymptoms.createSymptoms);
router.get('/patient/symptom/:id', patientMoodsAndSymptoms.getSymptoms);
router.patch('/patient/symptoms/:id', patientMoodsAndSymptoms.getAllSymptoms);

module.exports = router;
