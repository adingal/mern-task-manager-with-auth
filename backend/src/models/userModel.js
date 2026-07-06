const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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

/**
 * Hash password before saving to DB
 */
userSchema.pre('save', async function () {
  // Only run this if password is modified
  if (!this.isModified('password')) return

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  // Delete passwordConfirm
  this.passwordConfirm = undefined
})

/**
 * Compare password with user password in DB
 */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model('User', userSchema)
