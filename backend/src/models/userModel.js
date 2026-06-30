const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A task must have a name.'],
    trim: true,
    minLength: [10, 'A task name must have 10 or more characters.'],
    maxLength: [40, 'A task name must have 40 or less characters.'],
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      // Only works on create and save
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
