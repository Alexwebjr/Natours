const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//-------------------------   ROUTE   ----------------------//

router.post('/signup', authController.signup); //Auth
router.post('/login', authController.login); //Auth
router.get('/logout', authController.logout); //Auth
router.post('/forgotPassword', authController.forgotPassword); //Auth
router.patch('/resetPassword/:token', authController.resetPassword); //Auth

//Protect all routes after this mdd
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword); //Auth
router.route('/me').get(userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

//RestricTo all routes after this mdd
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//EXPORTS
module.exports = router;
