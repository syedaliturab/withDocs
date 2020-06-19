const express = require('express');
const userController = require('../controllers/userController');
const user = require('../controllers/authController');
const router = express.Router();

router
    .route('/')
    .post(user.signup);


module.exports = router;