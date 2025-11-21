// routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// signup
router.post(
  '/signup',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  authController.signup
);

// login
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  authController.login
);

// get me
router.get('/me', auth, authController.getMe);

// update profile
router.put('/update-profile', auth, authController.updateProfile);

// change password
router.put('/change-password', auth, authController.changePassword);

module.exports = router;
