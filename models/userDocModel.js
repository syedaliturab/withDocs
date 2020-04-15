 const mongoose = require('mongoose');
 const slugify = require('slugify');
 const cryto = require('crypto');
 const brypt = require('bcryptjs');
 const validator = require('validator');
 const docUserSchema = new mongoose.Schema({
     name: {
         type: String,
         requried: [true, 'Please provide your name']
     },
     email: {
         type: String,
         unique: true,
         validate: [validator.isEmail, 'Please provide valid email']
     },
     dateOfBirth: {
         type: Date,
         required: [true, 'Please provide dateOfBirth']
     },
     state: {
         type: String,
         required: [true, 'Please provide state']
     },
     city: {
         type: String,
         required: [true, 'Please provide a city']
     },
     pincode: {
         type: Number,
         required: [true, 'Please provide pincode'],
         length: [6, 'Please provide 6 digit pincode']
     },
     homeAddress: {
         // GeoJSON   
         type: {
             type: String,
             default: 'Point',
             enum: ['Point']
         },
         coordinates: [Number],
         address: String
     },
     contactNo: {
         type: Number,
         unique: true,
         required: [true, 'Please provide contact number']
     },
     alternateContactNo: {
         type: Number

     },
     gender: {
         type: String,
         required: [true, 'Please provide gender'],
         enum: {
             values: ['male', 'female'],
             message: 'gender is either male or female'
         }
     },
     degree: {
         type: String,
         required: [true, 'Please provide a degree name']
     },
     college: {
         type: String,
         required: [true, 'Please provide college name']
     },
     dateOfGraduation: {
         type: Date,
         required: [true, 'Please provide dateOfGraduation']
     },
     doctorRegistrationNo: {
         type: String,
         required: [true, 'Please provide doctor Registration Number']
     },
     field: {
         type: String,
         required: [true, 'Please provide field of work']
     },
     additionalQualification: {
         type: String
     },
     experience: {
         type: Number,
         required: [true, 'Please provide your experience']
     },
     password: {
         type: String,
         required: [true, 'Please provide a password'],
         select: false,
         minlength: 8,
         select: false
     },
     confirmPassword: {
         type: String,
         required: [true, 'Please confirm your password'],
         validate: {
             // This only works on CREATE and SAVE!!!
             validator: function (val) {
                 return val === this.password;

             },
             message: 'Password are not same'
         }
     }
 });

 docUserSchema.pre('save', async function (next) {
     if (!this.isModified('password'))
         return next();
     this.password = await brypt.hash(this.password, 11);
     this.confirmPassword = undefined;
     next();


 });

 const DocUser = mongoose.model('Docters',
     docUserSchema);
 module.exports = DocUser;