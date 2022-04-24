import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { saveState } from '../utils/localStorage'
import authService from '../services/authService'

export const loginUserAsync = createAsyncThunk(
  'auth/loginUserAsync',
  userData => authService.login(userData)
)

export const registerUserAsync = createAsyncThunk(
  'auth/registerUserAsync',
  userData => authService.register(userData)
)

const initialState = {
  user: null,
  status: 'idle',
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = initialState.user
    },
  },
  extraReducers: {
    [loginUserAsync.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [registerUserAsync.fulfilled]: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { logoutUser } = authSlice.actions

export default authSlice.reducer

export const selectAuthState = state => state.auth

export const authMiddleware = store => next => action => {
  const result = next(action)
  if (action.type?.startsWith('auth/')) {
    const authUser = store.getState().auth.user
    saveState(authUser)
  }
  return result
}
