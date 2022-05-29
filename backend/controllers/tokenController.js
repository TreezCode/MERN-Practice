// external imports
const jwt = require('jsonwebtoken');
// internal imports
const User = require('../models/userModel');

// @desc    Refresh access token with stored refresh token
// @route   POST /api/users/refresh
// @access  Public
const handleRefreshToken = (req, res) => {
  // Check for cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // unauthorized
  const refreshToken = cookies.jwt;
  // Check for user token in database
  const user = User.findOne({ refreshToken }).select('-password');
  if (!user) return res.sendStatus(403); // forbidden
  // Verify token
  if (user) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.name !== decoded.name) {
          res.status(403); // forbidden
          throw new Error('Forbidden refresh token');
        }
        const accessToken = generateAccessToken(decoded.id);
        res.json({ accessToken });
      }
    );
  } else {
    res.status(401);
    throw new Error('Unauthorized refresh token');
  }
};

// Generate Access Token
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30s',
  });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {
  handleRefreshToken,
  generateAccessToken,
  generateRefreshToken,
};
