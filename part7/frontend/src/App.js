import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, Route, Routes } from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import { Divider } from 'antd'
import { initializeUser } from './reducers/loginReducer'
import { Button, Dropdown } from 'antd'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  if (user) {
    return (
      <>
        <Dropdown menu={{
          items: [
            {
              key: '1',
              label: (
                <Link to='/blogs'>Blogs</Link>
              ),
            },
            {
              key: '2',
              label: (
                <Link to='/users'>Users</Link>
              ),
            }
          ]
        }} placement="bottomLeft" arrow>
          <Button>Menu</Button>
        </Dropdown>
        <UsernameLogout />
        <Divider />
        <Notification />
        <Routes>
          <Route path='/logout' element={<UsernameLogout />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/addblog' element={<BlogForm />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<Users />} />
        </Routes>
      </>
    )
  }
  return (
    <>
      <Notification />
      <LoginForm />
    </>
  )
}

export default App