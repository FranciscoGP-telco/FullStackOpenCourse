import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, Route, Routes } from 'react-router-dom'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'

//import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  if (user) {
    return (
      <div>
        <Link to='/blogs'>Blog List</Link>
        <Link to='/addblog'>Add Blog</Link>
        <Link to='/logout'>logout</Link>
        <hr/>
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path='/logout' element={<UsernameLogout />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/addblog' element={<BlogForm />} />
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <LoginForm />
    </div>
  )
}

export default App