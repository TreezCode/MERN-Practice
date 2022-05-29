// external imports
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// internal imports
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Check for token in http headers authorization object
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token and format
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // Get user from token payload, exclude password
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(403);
      throw new Error('Failed to authenticate token');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = {
  protect,
};
