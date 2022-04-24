import { useSelector } from 'react-redux'
import { selectAuthState } from '../reducers/authSlice'

const RequireOwnership = props => {
  const { user } = useSelector(selectAuthState)

  if (user?.username !== props.ownerUsername) {
    return null
  }

  return props.children
}

export default RequireOwnership
