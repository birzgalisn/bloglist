import { forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/useField'
import { createBlogAsync } from '../../reducers/blogSlice'

const BlogForm = forwardRef((props, ref) => {
  const [title, titleInput, resetTitle] = useField('text')
  const [author, authorInput, resetAuthor] = useField('text')
  const [url, urlInput, resetUrl] = useField('url')
  const dispatch = useDispatch()

  const handleCreateBlog = e => {
    e.preventDefault()
    dispatch(createBlogAsync({ title, author, url }))
    resetTitle()
    resetAuthor()
    resetUrl()
    ref.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...titleInput} />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input id="author" {...authorInput} />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input id="url" {...urlInput} />
      </div>
      <button type="submit">Create new blog</button>
    </form>
  )
})

export default BlogForm
