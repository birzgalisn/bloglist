import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RequireUser from '../../components/RequireUser'
import Spinner from '../../components/Spinner'
import {
  getOneBlogAsync,
  likeBlogAsync,
  selectOneBlog,
} from '../../reducers/blogSlice'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const Blog = () => {
  const blogId = useParams().blogId
  const blog = useSelector(selectOneBlog(blogId))
  const dispatch = useDispatch()

  useEffect(() => {
    if (!blog) {
      dispatch(getOneBlogAsync(blogId))
    }
  }, [])

  if (!blog) {
    return <Spinner />
  }

  const handleLike = () => {
    dispatch(likeBlogAsync(blogId))
  }

  return (
    <div>
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <p>
          {blog.likes} likes{' '}
          <RequireUser>
            <button onClick={handleLike}>Like</button>
          </RequireUser>
        </p>
        <p>Added by {blog.user.username}</p>
      </div>
      <div>
        <h3>Comments</h3>
        <RequireUser>
          <CommentForm />
        </RequireUser>
        <CommentList comments={blog.comments} />
      </div>
    </div>
  )
}

export default Blog
