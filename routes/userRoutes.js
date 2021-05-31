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
// const inputSettings = require('../controllers/inputSettingController');




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

// get user from google when re log in;
router.get('/profilegoogle', authController.getprofileGoogle);
router.get('/profilefb', authController.getprofileFacebook);
// ends

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
  .route('/pain')
  .get(haveController.getAllPain)
  .post(haveController.createPain);
router
  .route('/allergies')
  .get(haveController.getAllAllergies)
  .post(haveController.createAllergies);
router
  .route('/injuries')
  .get(haveController.getAllInjuries)
  .post(haveController.createInjuries);
router
  .route('/surgeries')
  .get(haveController.getAllSurgeries)
  .post(haveController.createSurgeries);
router
  .route('/chronicDiseases')
  .get(haveController.getAllChronicDiseases)
  .post(haveController.createChronicDiseases);
router
  .route('/heridatoryDiseases')
  .get(haveController.getAllHeridatoryDiseases)
  .post(haveController.createHeridatoryDiseases);
router
  .route('/currentMedications')
  .get(haveController.getAllCurrentMedications)
  .post(haveController.createCurrentMedications);
router
  .route('/pastMedications')
  .get(haveController.getAllPastMedications)
  .post(haveController.createPastMedications);



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

  router.get('/patient/relatives/:id',patientController.getAllPatientRelativeProfile);

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


router
  .route('/patient/settings')
  .post(patientSettings.createPatientSetting)
  .get(patientSettings.getPatientSetting)
  .patch(patientSettings.updatePatientSettings);

router.post('/patient/inputSettings', patientSettings.createinputSetting)
router.get('/patient/getallInputSettings/:id', patientSettings.getAllInputSetting);
router.get('/patient/getInputSettings/:id', patientSettings.getInputSetting);

router.post('/patient/padSettings', patientSettings.createpadSetting);
router.get('/patient/getallPadSettings/:id', patientSettings.getAllPadSetting);
router.get('/patient/getPadSettings/:id', patientSettings.getPadSetting);

router.post('/patient/periodAlertSettings', patientSettings.createperiodAlertSetting);
router.get('/patient/getallPeriodAlertSettings/:id', patientSettings.getAllperiodAlertSetting);
router.get('/patient/getPeriodAlertSettings/:id', patientSettings.getperiodAlertSetting);

router.post('/patient/periodEndSettings', patientSettings.createperiodEndSetting);
router.get('/patient/getallPeriodEndSettings/:id', patientSettings.getAllperiodEndSetting);
router.get('/patient/getPeriodEndSettings/:id', patientSettings.getperiodEndSetting);

router.post('/patient/periodovulationSettings', patientSettings.createovulationSetting);
router.get('/patient/getallPeriodovulationSettings/:id', patientSettings.getAllovulationSetting);
router.get('/patient/getPeriodovulationSettings/:id', patientSettings.getovulationSetting);

router.post('/patient/pillsSettings', patientSettings.createpillsSetting);
router.get('/patient/getallpillsSettings/:id', patientSettings.getAllpillsSetting);
router.get('/patient/getpillsSettings/:id', patientSettings.getpillsSetting);

router.post('/patient/contraceptionSettings', patientSettings.createcontraceptionSetting);
router.get('/patient/getallcontraceptionSettings/:id', patientSettings.getAllcontraceptionSetting);
router.get('/patient/getcontraceptionSettings/:id', patientSettings.getcontraceptionSetting);

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
router.get('/patient/RegAndIrregs/:id', patientReportController.getAllRegularAndIrregular);

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
router.get('/patient/symptoms/:id', patientMoodsAndSymptoms.getAllSymptoms);

router.post('/patient/pill/', patientReportController.createPills);
router.get('/patient/pill/:id', patientReportController.getPills);
router.get('/patient/pills/:id', patientReportController.getAllPills);

module.exports = router;
