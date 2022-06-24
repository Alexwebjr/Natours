//review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour.'],
      },
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to an user'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Prevent duplicate
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

//QUERY MIDDLEWARE
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // })

  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const statts = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  // console.log(statts);
  if (statts.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: statts[0].nRating,
      ratingsAverage: statts[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  //this: points to current review
  //Review.calcAverageRatings(this.tour); is not goint to work, because is declarate below
  this.constructor.calcAverageRatings(this.tour);
});

//!CHECK
//QUERY Middleware
// reviewSchema.pre(/^findOneAnd/, async function (next) {
//pre: before execute the query
//   this.r = await this.findOne(); //trick to save temporary
//   next();
// });
// reviewSchema.post(/^findOneAnd/, async function () {
//   console.log();
//post: after execute the query
//await this.findOne(); does NOT work here, query has already executed
//   await this.r.constructor.calcAverageRatings(this.r.tour);
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
