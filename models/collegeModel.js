const mongoose = require('mongoose');

const college = mongoose.Schema({
    collegeName : {
        type:[String]
    }
});
const CollegeNames = mongoose.model('College',college);
module.exports = CollegeNames;