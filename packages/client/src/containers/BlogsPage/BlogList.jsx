import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogsAsync, selectBlogsState } from '../../reducers/blogSlice'
import Togglable from '../../components/Togglable'
import BlogForm from './BlogForm'
import BlogListItem from './BlogListItem'
import RequireUser from '../../components/RequireUser'

const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs } = useSelector(selectBlogsState)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(getAllBlogsAsync())
  }, [])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  return (
    <div>
      <h2>Blogs</h2>
      <RequireUser>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm ref={blogFormRef} />
        </Togglable>
      </RequireUser>
      <div>
        {blogs.length ? (
          blogs.map(b => <BlogListItem key={b.id} blog={b} style={style} />)
        ) : (
          <div style={style}>No blogs</div>
        )}
      </div>
    </div>
  )
}

export default BlogList
