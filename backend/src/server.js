const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

const taskRouter = require('./routes/taskRoutes')

// Insert config
dotenv.config({ path: './config.env' })

// App
const app = express()
app.use(express.json())

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

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
