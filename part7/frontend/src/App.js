import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
//import loginService from './services/login'
import { modifyNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUser, logoutUser, loginUser } from './reducers/loginReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()



  const user = useSelector(state => {
    return state.user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])


  const blogFormRef = useRef()


  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      const newBlog = await blogService.create(blogObject)
      dispatch(createBlog(newBlog))
      dispatch(modifyNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.title} added`,
        error: false
      }))
    } catch (exception) {
      dispatch(modifyNotification({
        message: 'Error posting the new blog',
        error: true
      }))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  if (user) {
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <UsernameLogout user={user} handleLogout={handleLogout}/>
        <Blogs />
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleUsername={handleUsername}
        handlePassword={handlePassword}/>
    </div>
  )
}

export default App