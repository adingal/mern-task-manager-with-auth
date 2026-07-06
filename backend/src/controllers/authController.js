const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

/**
 * Create and send user token
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true
  }

  res.cookie('jwt', token, cookieOptions)

  // Remove the password from the output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

/**
 * Login user
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // 1. Check if email and password exist
    if (!email || !password) {
      throw new Error('Please provide email and password.')
    }
    // 2. Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password')

    // User needs to be validated before comparing password, otherwise it will throw error if user doesn't exist
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Incorrect email or password.')
    }

    // 3. If everything is ok, send token to client
    createSendToken(user, 200, res)
  } catch (error) {
    next(error)
  }
}

/**
 * Check user if logged in
 */
exports.protect = async (req, res, next) => {
  try {
    // 1. Get token and check if it exists
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      throw new Error('You are not logged in. Please log in to get access.')
    }

    // 2. Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      throw new Error('The user belonging to this token no longer exists.')
    }

    // 4. Grant access to protected route
    req.user = currentUser
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * Retrict access for authorization
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['user', 'admin']
    if (!roles.includes(req.user.role)) {
      throw new Error('You do not have permission to perform this action.')
    }
    next()
  }
}
