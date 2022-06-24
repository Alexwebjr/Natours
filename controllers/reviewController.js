const Review = require('../models/reviewModel');

const catchAsync = require('../helpers/catchAsync');

//const APIFeatures = require('../helpers/apiFeatues');

// const AppError = require('../helpers/appError');

const factory = require('./handlerFactory');
//-------------------   FUNCTIONS  API   -------------------

exports.setTourUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
});

exports.createReview = factory.createOne(Review);

exports.getReview = factory.getOne(Review);
exports.getAllReviews = factory.getAll(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
