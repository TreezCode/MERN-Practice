import { verify } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { findById } from '../models/userModel'

const protect = asyncHandler(async (req, res, next) => {
  let token
  // Check for token in http headers authorization object
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token and format
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decoded = verify(token, process.env.JWT_SECRET)
      // Get user from token payload, exclude password
      req.user = await findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Failed to authenticate token')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export default {
  protect,
}
