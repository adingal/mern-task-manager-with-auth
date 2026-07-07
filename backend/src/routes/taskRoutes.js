const express = require('express')

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

const { protect } = require('../controllers/authController')

const router = express.Router()

router.route('/').get(protect, getAllTasks).post(protect, createTask)

router
  .route('/:id')
  .get(getTask)
  .patch(protect, updateTask)
  .delete(protect, deleteTask)

module.exports = router
