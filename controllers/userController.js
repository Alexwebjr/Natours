const User = require('../models/userModel');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');
const factory = require('./handlerFactory');

//-------------------   Helper   -------------------//
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
//----------------------------------------------------------//
//-------------------   FUNCTIONS  API   -------------------//
//----------------------------------------------------------//

//Create
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! Please use /singnup instead',
  });
};

//Read
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  console.log(req.user);
  next();
};
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

//Update || Do not use password
exports.updateUser = factory.updateOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use/updateMyPassword',
        400
      )
    );
  }

  //2) Update user document
  const filteredBody = filterObj(req.body, 'name', 'email'); //just update this fields
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

//Delete
exports.deleteUser = factory.deleteOne(User);

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});
