import { createSlice } from '@reduxjs/toolkit'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload)
    },
    editTask: (state, action) => {
      const index = state.findIndex((t) => t._id === action.payload._id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removeTask: (state, action) => {
      return state.filter((t) => t._id !== action.payload)
    },
  },
})

export const { addTask, editTask, removeTask } = tasksSlice.actions
export default tasksSlice.reducer
