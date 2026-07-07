const Task = require('../models/taskModel')

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id })

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: tasks,
    })
  } catch (error) {
    next(error)
  }
}

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id })

    res.status(201).json({
      status: 'success',
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      { returnDocument: 'after', runValidators: true },
    )

    res.status(200).json({
      status: 'success',
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id)

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
