import userService from '../services/users'
import { useState, useEffect } from 'react'
import { useMatch, Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const match = useMatch('/users/:id')

  const initializeUsers = async () => {
    const userList = await userService.getAll()
    setUsers(userList)
  }

  useEffect(() => {
    initializeUsers()
  }, [])

  if(match) {
    const idFromUrl = match.params.id
    const setUserFromServer = async () => {
      const userFromId = await userService.getUserById(idFromUrl)
      setUser(userFromId)
    }
    setUserFromServer()
    if(!user) return null

    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }

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
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users