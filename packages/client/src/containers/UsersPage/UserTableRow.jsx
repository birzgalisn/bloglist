import { Link } from 'react-router-dom'

const UserTableRow = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
      <td>{user.comments.length}</td>
    </tr>
  )
}

export default UserTableRow
