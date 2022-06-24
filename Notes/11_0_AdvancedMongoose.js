/*1. ======== Geospatial Data ======== 

tourModel.....
startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],

*/
/*2. ======== Embedding ========  
//*tourModel... add fields:
guides: Array


//*PostMan:
{
  name: "..."
  guides: [###, ###, ###]
}

//*Middleware to embed id:
tourSchema.pre('save', async function(next){
tourSchema.pre('save', async function(next){
  const guidesPromises = this.guide.map(async id => await User.findById(id));
  this.guide = await Promise.all(guidesPromises);
  next();
});
});

*/

/*3. ======== Child Referencing ======== 
//*Tourmodel add fiels:
guides:[
  {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
]

//*Postman:
{
  "name": ...
  "guides": [####,####]
}
*/

/*3. ======== Populating ======== 
*Add to model: to adjunt guides objects just in result, not in db.

const Tour = mongoose.model('Tour', tourSchema).populate('guides');

or create a query mdd, and hide fields:

tourSchema.pre('/^find/', function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});



*/

/*======== Nested Routes ========  
*Adding to tourRouter

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );


*Adding to controller
exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  ....



======== 2.0 Nested Routes Express ========  
*add to tourRoutes
router.use('/:tourId/reviews', reviewRouter); //redirect to reviewRouter

*add to reviewRouter
const router = express.Router({mergeParams: true});


======== 3.0 Nested filter ======== 
*filter tour in reviewsControllers
 let filter={};

 if (req.params.tourId) filter = {tour: req.params.tourId};

 const reviews = await Revies.find(filters);

*/

/* ======== handlerFactory ======== 
*handlerController
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });



*xController:
exports.deleteTour = factory.deleteOne(Tour);

*/

/*======== Protect/RestricTo All routes ========
 *Protect all routes after this mdd
router.use(authController.protect);
 */

/*======== Import All ========
await User.create(users, {validateBeforeSave: false});
 */

/*======== INDEX ========
tourSchema.index({ price: 1 }); //1 = asc, -1 = desc
 
 */

/**======== Avg Ratings ========
 * After save a new review, calculate de avg and update de Tour avgRating
 
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

  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: statts[0].nRating,
    ratingsAverage: statts[0].avgRating,
  });
};

reviewSchema.post('save', function () {
  //this: points to current review
  //Review.calcAverageRatings(this.tour); is not goint to work, because is declarate below
  this.constructor.calcAverageRatings(this.tour);
}); 
 
 */

/*======== Avg Ratings on UPDATE/DELETE ========
//!Watch Out
reviewSchema.pre(/^findOneAnd/, async function (next) {
*pre: before execute the query
  this.r = await this.findOne(); //trick to save temporary
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  console.log();
*post: after execute the query
*await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});
*/

/*======== Prevent Duplicate Reviews ========
*Prevent duplicate
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
*/
