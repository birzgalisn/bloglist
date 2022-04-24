import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/useField'
import { createCommentAsync } from '../../reducers/blogSlice'

const CommentForm = () => {
  const blogId = useParams().blogId
  const [comment, commentInput, resetComment] = useField('text')
  const dispatch = useDispatch()

  const handleCreateComment = e => {
    e.preventDefault()
    dispatch(createCommentAsync({ blogId, comment }))
    resetComment()
  }

  return (
    <form onSubmit={handleCreateComment}>
      <label htmlFor="comment">
        <input id="comment" {...commentInput} />
      </label>
      <button type="submit">Create comment</button>
    </form>
  )
}

export default CommentForm
