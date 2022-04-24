import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneUserAsync, selectOneUser } from '../../reducers/userSlice'
import Spinner from '../../components/Spinner'

const User = () => {
  const userId = useParams().userId
  const user = useSelector(selectOneUser(userId))
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      dispatch(getOneUserAsync(userId))
    }
  }, [])

  if (!user) {
    return <Spinner />
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <div>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.length ? (
            user.blogs.map(b => <li key={b.id}>{b.title}</li>)
          ) : (
            <li>No blogs</li>
          )}
        </ul>
        <h3>Added comments</h3>
        <ul>
          {user.comments.length ? (
            user.comments.map(c => <li key={c.id}>{c.comment}</li>)
          ) : (
            <li>No comments</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default User
