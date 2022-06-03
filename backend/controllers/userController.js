// external imports
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
// internal imports
const User = require('../models/userModel');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('./tokenController');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // Validate input
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields.');
  }
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    // Save refresh token to user
    const refreshToken = generateRefreshToken(user.id);
    user.refreshToken = refreshToken;
    const updatedUser = await user.save();
    console.log('User created ==>'.yellow, updatedUser);
    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Send (roles) and access token back to user
    res.status(201).json({
      // _id: user.id,
      // username: user.username,
      // email: user.email,
      accessToken: generateAccessToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields.');
  }
  // Check for user email
  const user = await User.findOne({ email }).exec();
  // Check password
  if (user && (await bcrypt.compare(password, user.password))) {
    // Save refresh token to user
    const refreshToken = generateRefreshToken(user.id);
    user.refreshToken = refreshToken;
    const updatedUser = await user.save();
    console.log('User logged in ==>'.yellow, updatedUser);
    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Send (roles) and access token back to user
    res.json({
      // _id: updatedUser.id,
      // username: updatedUser.username,
      // email: updatedUser.email,
      accessToken: generateAccessToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Logout user by clearing jwt cookie
// @route   GET /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  // Check for cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;
  // Check for user refresh token in db
  const user = await User.findOne({ refreshToken }).select('-password').exec();
  if (!user) {
    // Clear jwt cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    return res.sendStatus(204); // no-content
  }
  // Delete refresh token from database
  user.refreshToken = '';
  const result = await user.save();
  console.log('User logged out ==>'.yellow, result);
  // Clear cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
  res.sendStatus(204);
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
