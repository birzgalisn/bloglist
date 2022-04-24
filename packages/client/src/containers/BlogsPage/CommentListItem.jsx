import RequireOwnership from '../../components/RequireOwnership'

const CommentListItem = ({ comment }) => {
  return (
    <li>
      {comment.comment}{' '}
      <RequireOwnership ownerUsername={comment.user?.username}>
        <button>Remove</button>
      </RequireOwnership>
    </li>
  )
}

export default CommentListItem
