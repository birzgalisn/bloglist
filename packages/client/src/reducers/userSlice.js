import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

export const getAllUsersAsync = createAsyncThunk('users/getAllUsersAsync', () =>
  userService.getAll()
)

export const getOneUserAsync = createAsyncThunk(
  'users/getOneUserAsync',
  userId => userService.getOne(userId)
)

const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsersAsync.fulfilled]: (state, action) => {
      state.users = action.payload
    },
    [getOneUserAsync.fulfilled]: (state, action) => {
      state.users = state.users.length
        ? state.users.map(u =>
            u.id !== action.payload.id ? u : action.payload
          )
        : [action.payload]
    },
  },
})

export const {} = userSlice.actions

export default userSlice.reducer

export const selectUsersState = state => state.users

export const selectOneUser = userId => state =>
  state.users.users.find(u => u.id === userId)
