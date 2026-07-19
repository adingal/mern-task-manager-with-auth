import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import auth from '../../api'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const res = await auth.get('/api/v1/tasks', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return res.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  },
)

export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (task, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const res = await auth.post('/api/v1/tasks', task, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return res.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  },
)

export const editTaskAsync = createAsyncThunk(
  'tasks/editTaskAsync',
  async (task, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const res = await auth.patch(`/api/v1/tasks/${task._id}`, task, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return res.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  },
)

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTaskAsync',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      await auth.delete(`/api/v1/tasks/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return id
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  },
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    addTask: (state, action) => {
      if (Array.isArray(state.data)) {
        const exists = state.data.some((t) => t._id === action.payload._id)
        if (!exists) {
          state.data.push(action.payload)
        }
      }
    },
    editTask: (state, action) => {
      if (Array.isArray(state.data)) {
        const index = state.data.findIndex((t) => t._id === action.payload._id)
        if (index !== -1) {
          state.data[index] = {
            ...state.data[index],
            ...action.payload,
          }
        }
      }
    },
    deleteTask: (state, action) => {
      if (Array.isArray(state.data)) {
        state.data = state.data.filter((t) => t._id !== action.payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data || action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.data.push(action.payload.data || action.payload)
      })

      // Edit
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        const updated = action.payload.data || action.payload
        const index = state.data.findIndex((t) => t._id === updated._id)
        if (index !== -1) {
          state.data[index] = updated
        }
      })

      // Delete
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((t) => t._id !== action.payload)
      })
  },
})

export const { addTask, editTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer
