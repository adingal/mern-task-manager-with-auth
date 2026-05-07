const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// Security
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const taskRouter = require('./routes/taskRoutes')
const errorHandler = require('./utils/errorHandler')

// App
const app = express()

// Set security HTTP headers
app.use(helmet())

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: 'Too many request from this IP, please try again in an hour.',
})
app.use(limiter)

// Allow requests from frontend dev server
app.use(
  cors({
    origin: 'http://localhost:5173', // frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

// Parse incoming request to JSON
app.use(express.json({ limit: '10kb' }))

// Redefine req.query to be writable for Express 5 compatibility before sanitize
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  })
  next()
})

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Routes
app.use('/api/v1/tasks', taskRouter)

// Catch-all for unmatched routes
app.all(/.*/, (req, res) => {
  res.status(404).json({ status: 'fail', message: 'Route not found.' })
})

// Global error handler
app.use(errorHandler)

module.exports = app
