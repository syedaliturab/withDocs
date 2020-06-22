const express = require('express');
const userDocController = require('./../controllers/userDocController')
const router = express.Router();


router.route('/:id').get(userDocController.getDoctor).
patch(userDocController.updateDocUser);
router
    .route('/')
    .get(userDocController.getAllDocUsers)
    .post(userDocController.createDocUser);
module.exports = router;