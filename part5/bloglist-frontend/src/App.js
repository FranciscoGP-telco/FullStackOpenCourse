import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import OperationDone from './components/OperationDone'
import Error from './components/Error'
import UsernameLogout from './components/UsernameLogout'
import CreatePost from './components/CreatePost'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
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

  const handlePost = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    try{
      const newBlog = await blogService.create(blogObject)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setMessage(`A new blog ${newBlog.title} by ${newBlog.title} added`)
      setTimeout(() => {
        setErrorMessage('')
      }, 6000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Error posting the new blog')
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

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
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
          <CreatePost 
            newTitle={newTitle} 
            newAuthor={newAuthor} 
            newUrl={newUrl} 
            handlePost={handlePost} 
            handleNewTitle={handleNewTitle} 
            handleNewAuthor={handleNewAuthor} 
            handleNewUrl={handleNewUrl}
          />
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