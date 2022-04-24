import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './AppLayout'
import Login from '../containers/LoginPage'
import Register from '../containers/RegisterPage'
import Blogs from '../containers/BlogsPage'
import Users from '../containers/UsersPage'
import NoMatch from '../containers/NoMatchPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate repalce to="blogs" />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="blogs/*" element={<Blogs />} />
        <Route path="users/*" element={<Users />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default App
