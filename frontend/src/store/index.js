import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasks/tasksSlice'
import authReducer from './auth/authSlice'
import usersReducer from './users/usersSlice'
import modalReducer from './modal/modalSlice'
import { createLogger } from 'redux-logger'

const logger = createLogger()

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    users: usersReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    // Run logger only on development
    if (import.meta.env.MODE === 'development') {
      return getDefaultMiddleware().concat(logger)
    }
    return getDefaultMiddleware()
  },
})

export default store
