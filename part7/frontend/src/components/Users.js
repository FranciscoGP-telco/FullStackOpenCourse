import userService from '../services/users'
import { useState, useEffect } from 'react'
import { useMatch, Link } from 'react-router-dom'
import { Table, Typography, List } from 'antd'

const Users = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const match = useMatch('/users/:id')
  const { Title } = Typography
  const { Column } = Table
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
        <Title>{user.name}</Title>
        <Title level={3}>added blogs</Title>
        <List
          itemLayout="horizontal"
          dataSource={user.blogs}
          renderItem={(blog) => (
            <List.Item>{blog.title}</List.Item>
          )}
        />
      </div>
    )
  }

  return (
    <div>
      <Title>Users</Title>
      <Table dataSource={users}>
        <Column
          title='Users'
          dataIndex='name'
          key='name'
          render={(_, record) => (
            <Link to={`/users/${record.id}`}>{record.name}</Link>
          )}
        />
        <Column
          title='Blogs created'
          dataIndex='blogs'
          key='blogs'
          render={(_, record) => (
            <>
              {record.blogs.length}
            </>
          )}
        />
      </Table>
    </div>
  )
}

export default Users