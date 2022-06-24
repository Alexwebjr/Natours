//=============  MONGOOSE GetByQuery =============

/*----------- Query ----------
1. Tour.find({req.query}) //object
  1.1 Tour.find({duration: {$gte:5}})
  1.2 url/api/tour?duration[gte]=5

2. Tour.find().where('duration').equals(5).where('difficulty').equals('easy); //.lte, .mt

*/

/*-------- SORTING --------
let query = Tour.find({...});

1.Single: query = query.sort(req.query.sort); //tour?sort=price || sort=-price (desc)

2.Multiple: const sortBy = req.query.sort.split(',').join(' ');
query = query.sort(sortBy); 

EXAMPLE
    if (req.query.sort) {
      query = query.sort(req.query.sort); //tour?sort=price || sort=-price (desc)
    } else {
      query = query.sort('-createdAt');
    }

--------- Filed Limiting (Projecting) ---------
1. const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);

2. query = query.select('-__v'); //excluding


at schema prop: select: false //hide projecting

*/

/*----------- Pagination -----------
//url?page=2&limit=10
query = query.skip(2).limit(10); skip= how many items to skip, limit = how many bring

Example:
    const page = req.query.page * 1 || 1; //to Number and set default
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit; // formula to skip

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }
*/

/*------------ Middelware ------------
-Routes:
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

*/

/* ----------- GROUP DATA (AGGREGATE) ------------

//get group data
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          //_id: null,
          _id: 'difficult', //group by
          numTours: { $sum: 1 }, //i++
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      {
        $match: { _id: { $ne: 'EASY' } },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};


exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' }, //groupByMonth
          numTours: { $sum: 1 }, //count-Total
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTourStarts: -1,
        },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: plan,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

*/
