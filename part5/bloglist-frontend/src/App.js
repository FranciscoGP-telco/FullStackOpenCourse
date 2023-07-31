import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const OperationDone = ({message}) => {
  if (message === '') {
    return null
  }
  return (
    <div className='operation'>
      {message}
    </div>
  )
}

const Error = ({error}) => {
  if (error === '') {
    return null
  }
  return (
    <div className='error'>
      {error}
    </div>
  )
}

const ShowUsernameLogout = ({user, handleLogout}) => {
  return (
    <p>{user.name} is logged in <form onSubmit={handleLogout}><button type="submit">Logout</button></form></p>
  )
}

const CreatePost = ({newTitle, newAuthor, newUrl, handlePost, handleNewTitle, handleNewAuthor, handleNewUrl}) => {
  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={handlePost}>
        title:
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={handleNewTitle}/><br/>
        author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleNewAuthor}/><br/>
        url:
        <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleNewUrl}/><br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const ShowLogin = ({username, password, handleLogin, handleUsername, handlePassword}) => {
  return(
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}/>
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}/>
        </div>      
        <button type="submit">login</button>
      </form>
    </div>
  )
}
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
        <ShowUsernameLogout user={user} handleLogout={handleLogout}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <CreatePost 
          newTitle={newTitle} 
          newAuthor={newAuthor} 
          newUrl={newUrl} 
          handlePost={handlePost} 
          handleNewTitle={handleNewTitle} 
          handleNewAuthor={handleNewAuthor} 
          handleNewUrl={handleNewUrl}
        />
      </div>
    )
  } 
  return (
    <div>
      <OperationDone message={message} />
      <Error error={errorMessage} />
      <ShowLogin 
        username={username} 
        password={password} 
        handleLogin={handleLogin}
        handleUsername={handleUsername}
        handlePassword={handlePassword}/>
    </div>
  )
}

export default App