import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasks/tasksSlice'
import authReducer from './auth/authSlice'

const store = configureStore({
  reducer: {
    user: authReducer,
    tasks: tasksReducer,
  },
})

export default store
