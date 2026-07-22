import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import auth from '../../api'

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token)
    auth.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('token')
    delete auth.defaults.headers.common['Authorization']
  }
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await auth.post('/api/v1/users/login', credentials)
      const {
        token,
        data: { user },
      } = data
      setAuthToken(token)
      return user
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data.message || 'Login failed')
    }
  },
)

const initialState = {
  user: null,
  token: localStorage.getItem('token') ?? null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      setAuthToken(null)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.token = localStorage.getItem('token')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
