import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, Route, Routes } from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'
import Header from './components/Header'
import Users from './components/Users'

import { initializeUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  if (user) {
    return (
      <>
        <Link to='/blogs'>Blog List </Link>
        <Link to='/users'>Users </Link>
        <UsernameLogout />
        <hr/>
        <Header />
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