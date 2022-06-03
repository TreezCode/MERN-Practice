// external imports
const jwt = require('jsonwebtoken');
// internal imports
const User = require('../models/userModel');

// @desc    Refresh access token with stored refresh token
// @route   GET /api/users/refresh
// @access  Public
const handleRefreshToken = async (req, res) => {
  // Check for cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // unauthorized
  const refreshToken = cookies.jwt;
  console.log('Refresh Token ==> '.yellow, refreshToken);
  // Check for user token in database
  const user = await User.findOne({ refreshToken }).select('-password');
  const userID = user._id.toString();
  if (!user) {
    user.refreshToken = '';
    await user.save();
    return res.sendStatus(403); // forbidden
  }
  // Verify token
  if (user) {
    console.log('UserID ==>'.yellow, userID);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        console.log('Err ==>'.magenta, err);
        console.log('Decoded ==>'.magenta, decoded);
        if (err || userID !== decoded.id) {
          return res.sendStatus(403); // expired or forbidden
        }
        const accessToken = generateAccessToken(decoded.id);
        res.json({ accessToken: accessToken, email: user.email });
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
    expiresIn: '10s',
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
