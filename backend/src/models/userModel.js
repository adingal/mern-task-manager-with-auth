const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
    trim: true,
    minlength: [8, 'A name must have 8 or more characters.'],
    maxlength: [30, 'A name must have 30 or less characters.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A user must have an email.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'A password must have atleast 8 or more characters.'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same.',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  __v: {
    type: Number,
    select: false,
  },
})

module.exports = mongoose.model('User', userSchema)
