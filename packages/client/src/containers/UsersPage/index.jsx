import { Routes, Route } from 'react-router-dom'
import UserTable from './UserTable'
import User from './User'

const Users = () => {
  return (
    <Routes path="/">
      <Route index element={<UserTable />} />
      <Route path=":userId" element={<User />} />
    </Routes>
  )
}

export default Users
