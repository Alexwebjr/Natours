const express = require('express');

const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/reviewController');

const authController = require('../controllers/authController');

//-------------------------   ROUTE   ----------------------/

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(
    authController.restrictTo('admin', 'user'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  );

//EXPORTS
module.exports = router;
