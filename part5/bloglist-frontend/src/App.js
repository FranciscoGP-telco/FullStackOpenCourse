import { useState, useEffect, useRef } from 'react'

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
    const getAllBlogs = async () => {
      const listOfBlogs = await blogService.getAll()
      const compare = (a, b) => {
        if (a.likes < b.likes){
          return 1
        }
        if (a.likes > b.likes){
          return -1
        }
        return 0
      }
      listOfBlogs.sort(compare)
      setBlogs(listOfBlogs)
    }
    getAllBlogs()
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

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
    blogFormRef.current.toggleVisibility()
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

  const addLikes = async (id) => {
    try{
      const blogToUpdate = await blogService.getBlog(id)
      blogToUpdate.likes += 1
      const updatedBlog = await blogService.update(blogToUpdate, id)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (exception) {
      setErrorMessage('Error updating the likes')
      setTimeout(() => {
        setErrorMessage('')
      }, 6000)
    }
  }

  const deleteBlog = async (id) => {

    try{
      await blogService.deleteBlog(id)
      const filterId = (blog) => {
        return blog.id === id
      }
      setBlogs(blogs.filter(filterId))
    } catch (exception) {
      setErrorMessage('Error deleting the blog')
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
          <Blog key={blog.id} blog={blog} updateLikes={addLikes} removeBlog={deleteBlog}/>
        )}
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
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