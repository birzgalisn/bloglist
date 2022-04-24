import { configureStore } from '@reduxjs/toolkit'
import { loadState } from '../utils/localStorage'
import blogReducer, { blogMiddleware } from '../reducers/blogSlice'
import authReducer, { authMiddleware } from '../reducers/authSlice'
import userReducer from '../reducers/userSlice'

export default configureStore({
  reducer: {
    blogs: blogReducer,
    auth: authReducer,
    users: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authMiddleware, blogMiddleware),
  preloadedState: {
    auth: {
      user: loadState(),
      status: 'idle',
    },
  },
})
