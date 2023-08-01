import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import OperationDone from './components/OperationDone'
import Error from './components/Error'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('User or Password incorrect')
      console.log('User or Password incorrect')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage('')
      }, 6000)
    }
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }


  const addBlog = async (blogObject) => {
    try{
      const newBlog = await blogService.create(blogObject)
      setMessage(`A new blog ${newBlog.title} by ${newBlog.title} added`)
      setBlogs(blogs.concat(newBlog))
      setTimeout(() => {
        setMessage('')
      }, 6000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Error posting the new blog')
      setTimeout(() => {
        setErrorMessage('')
      }, 6000)
    }
  }

  if (user) {
    return (
      <div>
        <OperationDone message={message} />
        <Error error={errorMessage} />
        <h2>blogs</h2>
        <UsernameLogout user={user} handleLogout={handleLogout}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <Togglable buttonLabel="New blog">
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
    )
  } 
  return (
    <div>
      <OperationDone message={message} />
      <Error error={errorMessage} />
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