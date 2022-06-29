const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();
//-------------------------   ROUTE   ----------------------/

router.get(
  '/cheackout-session/:tourId',
  authController.protect,
  bookingController.getCheckOutSession
);

//EXPORTS
module.exports = router;
