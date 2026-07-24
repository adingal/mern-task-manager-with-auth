import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasks/tasksSlice'
import authReducer from './auth/authSlice'
import usersReducer from './users/usersSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    users: usersReducer,
  },
})

export default store
