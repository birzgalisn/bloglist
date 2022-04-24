import { useSelector } from 'react-redux'
import { selectAuthState } from '../reducers/authSlice'

const RequireUser = props => {
  const { user } = useSelector(selectAuthState)

  if (!user) {
    return null
  }

  return props.children
}

export default RequireUser
