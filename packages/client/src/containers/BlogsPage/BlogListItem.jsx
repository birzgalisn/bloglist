import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import RequireOwnership from '../../components/RequireOwnership'
import { removeBlogAsync } from '../../reducers/blogSlice'

const BlogListItem = ({ blog, style }) => {
  const dispatch = useDispatch()

  const removeBlog = () => {
    dispatch(removeBlogAsync(blog.id))
  }

  return (
    <div style={style}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      <RequireOwnership ownerUsername={blog.user?.username}>
        <button onClick={removeBlog}>Remove</button>
      </RequireOwnership>
    </div>
  )
}

export default BlogListItem
