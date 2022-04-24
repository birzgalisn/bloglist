import CommentListItem from './CommentListItem'

const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.length ? (
        comments.map(c => <CommentListItem key={c.id} comment={c} />)
      ) : (
        <li>No comments</li>
      )}
    </ul>
  )
}

export default CommentList
