import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../../hooks/useField'
import { registerUserAsync } from '../../reducers/authSlice'

const Register = () => {
  const [username, usernameInput, resetUsername] = useField('text')
  const [name, nameInput, resetName] = useField('text', '', false)
  const [password, passwordInput, resetPassword] = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegisterUserAsync = e => {
    e.preventDefault()
    dispatch(registerUserAsync({ username, name, password }))
      .then(() => {
        navigate('/blogs')
      })
      .catch(err => {
        console.error(err)
      })
    resetUsername()
    resetName()
    resetPassword()
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegisterUserAsync}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" {...usernameInput} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...nameInput} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...passwordInput} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
