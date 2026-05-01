const Task = require('../models/taskModel')

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: tasks,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: task,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)

    res.status(201).json({
      status: 'success',
      data: task,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      { new: true, runValidators: true },
    )

    res.status(200).json({
      status: 'success',
      data: task,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)

    res.status(204).end()
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}
