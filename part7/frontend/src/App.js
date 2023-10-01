import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser, loginUser } from './reducers/loginReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    try{
      dispatch(initializeBlogs())
    } catch (exception){
      console.log('Error getting the blogs:', exception)
    }
  }, [blogs])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])



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
        <BlogForm />
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