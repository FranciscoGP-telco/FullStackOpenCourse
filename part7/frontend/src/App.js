import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsernameLogout from './components/UsernameLogout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import { modifyNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

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
  }, [user])

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
      dispatch(modifyNotification({
        message: 'User or Password incorrect',
        error: true
      }))
      setUsername('')
      setPassword('')
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
      setBlogs(blogs.concat(newBlog))
      dispatch(modifyNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.title} added`,
        error: false
      }))
    } catch (exception) {
      dispatch(modifyNotification({
        message: 'Error posting the new blog',
        error: true
      }))    }
  }

  const addLikes = async (id) => {
    try{
      const blogToUpdate = await blogService.getBlog(id)
      blogToUpdate.likes += 1
      const updatedBlog = await blogService.update(blogToUpdate, id)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      dispatch(modifyNotification({
        message: `Like added to blog ${updatedBlog.title}`,
        error: false
      }))
    } catch (exception) {
      dispatch(modifyNotification({
        message: 'Error updating the likes',
        error: true
      }))
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
      console.log(exception)
      dispatch(modifyNotification({
        message: 'Error deleting the blog',
        error: true
      }))
    }
  }

  if (user) {
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <UsernameLogout user={user} handleLogout={handleLogout}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={addLikes} removeBlog={deleteBlog} userName={user.name}/>
        )}
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