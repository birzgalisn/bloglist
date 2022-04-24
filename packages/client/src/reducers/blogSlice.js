import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

export const getAllBlogsAsync = createAsyncThunk('blogs/getAllBlogsAsync', () =>
  blogService.getAll()
)

export const getOneBlogAsync = createAsyncThunk(
  'blogs/getOneBlogAsync',
  blogId => blogService.getOne(blogId)
)

export const createBlogAsync = createAsyncThunk(
  'blogs/createBlogAsync',
  blogData => blogService.create(blogData)
)

export const createCommentAsync = createAsyncThunk(
  'blogs/createCommentAsync',
  commentData => blogService.comment(commentData)
)

export const likeBlogAsync = createAsyncThunk('blogs/likeBlogAsync', blogId =>
  blogService.like(blogId)
)

export const removeBlogAsync = createAsyncThunk(
  'blogs/removeBlogAsync',
  blogId => blogService.remove(blogId)
)

const initialState = {
  blogs: [],
  status: 'idle',
  error: null,
}

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBlogsAsync.fulfilled]: (state, action) => {
      state.blogs = action.payload
    },
    [getOneBlogAsync.fulfilled]: (state, action) => {
      state.blogs = state.blogs.length
        ? state.blogs.map(b =>
            b.id !== action.payload.id ? b : action.payload
          )
        : [action.payload]
    },
    [createBlogAsync.fulfilled]: (state, action) => {
      state.blogs = [action.payload, ...state.blogs]
    },
    [createCommentAsync.fulfilled]: (state, action) => {
      state.blogs = state.blogs.map(b =>
        b.id === action.payload.blog
          ? { ...b, comments: [action.payload, ...b.comments] }
          : b
      )
    },
    [removeBlogAsync.fulfilled]: (state, action) => {
      state.blogs = state.blogs.filter(b => b.id !== action.payload.blog)
    },
    [likeBlogAsync.fulfilled]: (state, action) => {
      state.blogs = state.blogs.map(b =>
        b.id === action.payload.blog ? { ...b, likes: action.payload.likes } : b
      )
    },
  },
})

export const {} = blogSlice.actions

export default blogSlice.reducer

export const selectBlogsState = state => state.blogs

export const selectOneBlog = blogId => state =>
  state.blogs.blogs.find(b => b.id === blogId)

export const blogMiddleware = store => next => action => {
  const result = next(action)
  if (action.type?.startsWith('blogs/')) {
    const authUser = store.getState().auth.user
    blogService.setUser(authUser)
  }
  return result
}
