const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Insert config
dotenv.config({ path: './config.env' })

const app = require('./app')

// Connect to DB
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB connection successful.'))
  .catch((err) => console.log('DB connection fail.', err))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}...`)
})
