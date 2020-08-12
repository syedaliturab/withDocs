const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/ErrorUtil');
const APIFeatures = require('./../utils/apiFeatures');
const docUser = require('./../models/doctorModel.js');
const clinics = require('./../models/clinicModel.js');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    console.log(req.query);
    let query = Model.findById(req.query.id);
    if (popOptions) query = query.populate(popOptions);
    const user = await query;

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: "No document found with that ID"
      });
      //return next(new AppError('No document found with that ID', 404));
    }
    var move;
    const doctor = await docUser.findById(user._id);
    if(!doctor){
      move = "profile";
    }else if(doctor.stream==="Student" || doctor.nonPractising===true){
      move = "home";
    }else{
      const clinic = await clinics.findById(user._id);
      if(!clinic){
        move = "clinic";
      }else {
        move = "home";
      }
    }
    res.status(200).json({
      status: 'success',
      move,
      data: user
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: doc
    });
  });
