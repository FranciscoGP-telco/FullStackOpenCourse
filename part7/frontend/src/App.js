import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  if (user) {
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <UsernameLogout/>
        <Blogs />
        <BlogForm />
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