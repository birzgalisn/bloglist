import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAsync, selectUsersState } from '../../reducers/userSlice'
import UserTableRow from './UserTableRow'

const UserList = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(selectUsersState)

  useEffect(() => {
    dispatch(getAllUsersAsync())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Blogs</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map(u => <UserTableRow key={u.id} user={u} />)
          ) : (
            <tr>
              <td>No users found</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
