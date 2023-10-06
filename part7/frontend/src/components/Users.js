import userService from '../services/users'
import { useState, useEffect } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  const initializeUsers = async () => {
    const userList = await userService.getAll()
    setUsers(userList)

  }
  useEffect(() => {
    initializeUsers()
  }, [users])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        {users.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users