const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'A task must have a name.'],
    trim: true,
    minLength: [10, 'A task name must have 10 or more characters.'],
    maxLength: [40, 'A task name must have 40 or less characters.'],
  },
  description: {
    type: String,
    trim: true,
    minLength: [10, 'A task name must have 10 or more characters.'],
    maxLength: [120, 'A task name must have 40 or less characters.'],
  },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  __v: {
    type: Number,
    select: false,
  },
})

module.exports = mongoose.model('Task', taskSchema)
