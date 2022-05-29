// external imports
const express = require('express');
const router = express.Router();
// internal imports
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/me', protect, getMe);

module.exports = router;
