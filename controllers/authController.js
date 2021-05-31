const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const docUser = require('./../models/doctorModel.js');
const clinics = require('./../models/clinicModel.js');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/ErrorUtil');
const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  return token
};

exports.signup = catchAsync(async (req, res, next) => {

  if(!(req.body.email) && !(req.body.contact)){
    res.status(400).json({
      status: 'fail',
      message: "Please provide valid email or contact number!"
    });
  }

  const newUser = await User.create(req.body);

  // 3) If everything ok, send token to client
  const token = createSendToken(newUser,res);
  // Remove password from output
  newUser.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: newUser
  });
});



// for google
exports.getprofileGoogle = (req, res) => {
  const map = {
    email: req.body.email
  };
  User.findOne({email:map.email}, function(err, foundUser) {
    if(foundUser) {
      // console.log(foundUser);
      res.status(200).json({
        status: 'success',
        data: foundUser
      });
    } else {
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: 'Please Register!!',
        error: err
      });
    }
  });
}


// this one for facebook
exports.getprofileFacebook = (req, res) => {
  const mapData = {
    email: req.body.email
  };
  User.findOne({email:mapData.email}, function(err, foundUser) {
    if(foundUser) {
      // console.log(foundUser);
      res.status(200).json({
        status: 'success',
        data: foundUser
      });
    }
    else {
      res.status(400).json({
        status: 'fail',
        message: 'Please Register!!',
        error: err
      });
    }
  });
}




exports.login = catchAsync(async (req, res, next) => {

  var userId;
  var message;

  if(req.body.email) {
    userId = {email: req.body.email};
    message = "email";
  } else if(req.body.contact) {
    userId = {contact: req.body.contact};
    message = "contact number";
  }
  const password = req.body.password;
  // 1) Check if email and password exist
  if (!userId || !password) {
    res.status(400).json({
      status: 'fail',
      message: 'Please provide '+ $message + ' and password!'
    });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne(userId).select('+password');

  if (!user) {
    res.status(400).json({
      status: 'fail',
      message: message +" doesn't exist"
    });
  } else if(!(await user.correctPassword(password, user.password))){
    res.status(400).json({
      status: 'fail',
      message: 'Incorrect password'
    });
  }

  // 3) If everything ok, send token to client
  const token = createSendToken(user,res);
  // Remove password from output
  user.password = undefined;
  var move;
  const doctor = await docUser.findById(user._id);
  if(!doctor){
    move = "profile";
  }else if(doctor.stream==="Student"){
    move = "home";
  }else{
    const clinic = await clinics.findById(user._id);
    if(!clinic){
      move = "clinic";
    } else if(clinic.nonPractising===true){
      move = "home";
    }else {
      move = "home";
    }
  }
  res.status(200).json({
    status: 'success',
    token,
    move,
    data: user
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v11/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  // 3) If everything ok, send token to client
  const token = createSendToken(user,res);
  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: user
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.body.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  // 3) If everything ok, send token to client
  const token = createSendToken(user,res);
  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: user
  });
});


exports.emailToUser = catchAsync(async (req, res, next) => {

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/resetpassword/`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});
