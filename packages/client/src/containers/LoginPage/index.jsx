import { useField } from '../../hooks/useField'
import { useDispatch } from 'react-redux'
import { loginUserAsync } from '../../reducers/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, usernameInput, resetUsername] = useField('text')
  const [password, passwordInput, resetPassword] = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginUserAsync = e => {
    e.preventDefault()
    dispatch(loginUserAsync({ username, password }))
      .then(() => {
        navigate('/blogs')
      })
      .catch(err => {
        console.error(err)
      })
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLoginUserAsync}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" {...usernameInput} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...passwordInput} />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login
