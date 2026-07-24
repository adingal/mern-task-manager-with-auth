import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import auth from '../../api'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const res = await auth.get('/api/v1/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  },
)

export const addUserAsync = createAsyncThunk(
  'users/addUserAsync',
  async (user, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const res = await auth.post('/api/v1/users', user, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  },
)

export const editUserAsync = createAsyncThunk(
  'users/editUserAsync',
  async (user, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const res = await auth.patch(`/api/v1/users/${user._id}`, user, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  },
)

export const deleteUserAsync = createAsyncThunk(
  'users/deleteUserAsync',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      await auth.delete(`/api/v1/users/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data || action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.data.push(action.payload.data || action.payload)
      })

      // Edit
      .addCase(editUserAsync.fulfilled, (state, action) => {
        const updated = action.payload.data || action.payload
        const index = state.data.findIndex((u) => u._id === updated._id)
        if (index !== -1) {
          state.data[index] = updated
        }
      })

      // Delete
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u._id !== action.payload)
      })
  },
})

export default usersSlice.reducer
