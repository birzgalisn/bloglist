import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { selectAuthState } from '../reducers/authSlice'
import { logoutUser } from '../reducers/authSlice'

const AppLayout = () => {
  const { user } = useSelector(selectAuthState)
  const dispatch = useDispatch()

  const handleLogoutUser = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <h1>Bloglist App</h1>
      <nav>
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
        {user ? (
          <span>
            {user.username} logged in{' '}
            <button onClick={handleLogoutUser}>Log out</button>
          </span>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  )
}

export default AppLayout
