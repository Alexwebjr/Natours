/*============= Virtual Propos  =============
1. Add options. 
2. create virtual Props

example:
const tourSchema = new mongoose.Schema({...}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })

//Virtual props
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

*/

/*=============  DOCUMENT MIDDLEWARE  =============
//DOC Middleware: runs before/after .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true }); //create slug
  next();
});

tourSchema.post('save'.....);

*/

/*=============  QUERY MIDDLEWARE  =============
tourSchema.pre('/^find/', function (next) {
  // tourSchema.pre('find', function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

*/

/*=============  AGGREGATION MIDDLEWARE  =============
add in $match or in the model
tourSchema.pre('aggregate', function (next) {
  //add before
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  next();
});

*/

/*=============  DATA VALIDATION  =============
Model attribute:
      maxlength: [40, 'A tour name must have less o equal than 40 characters'],
      minlength: [10, 'A tour name must have more o equal than 40 characters'],
      min: [1, 'Rating must be above 1.0'],
      max: [1, 'Rating must be below 5.0'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },


CUSTOM Validator:
  priceDiscount: {
      type: Number,
      validate: function (val) {
        return val < this.price; //this only for new document creation
      },
    },

or
    priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },



LIBRARY
-validator.js //npm i validator

name: {

  validator: [
    validator.isAlpha,
    'A tour name must only contains characters',
  ],
}
*/
