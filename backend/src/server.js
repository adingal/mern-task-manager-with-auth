const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

// Security
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const taskRouter = require('./routes/taskRoutes')

// Insert config
dotenv.config({ path: './config.env' })

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

// Connect to DB
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB connection successful.'))
  .catch((err) => console.log('DB connection fail.', err))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}...`)
})
