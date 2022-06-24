const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');

const authController = require('../controllers/authController');

const reviewRouter = require('./reviewRouter');

//----------------------------------------------------------//
//-------------------------   ROUTE   ----------------------//
//----------------------------------------------------------//
//midd chekId
// router.param('id', tourController.checkID);

router.use('/:tourId/reviews', reviewRouter); //nested

router
  .route('/top-5-cheap')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.aliasTopTours,
    tourController.getAllTours
  );
router
  .route('/tour-Stats')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getTourStats
  );
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getMonthlyPlan
  );

// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

//EXPORTS
module.exports = router;