const express = require('express')

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

const { login, protect, restrictTo } = require('../controllers/authController')

const router = express.Router()

// Auth
router.post('/login', login)

router
  .route('/')
  .get(protect, restrictTo('admin'), getAllUsers)
  .post(protect, restrictTo('admin'), createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(protect, restrictTo('admin'), deleteUser)

module.exports = router
