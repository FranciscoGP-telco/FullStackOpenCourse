import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useRef } from 'react'
import { modifyNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    try{
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
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return(
    <div>
      <h2>Create new blog</h2>
      <Togglable buttonLabel='Create' cancelLabel='Hide' ref={blogFormRef}>
        <form onSubmit={addBlog}>
          title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            id="Title"
            placeholder='title of the blog'
            onChange={event => setNewTitle(event.target.value)}/><br/>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            id="Author"
            placeholder='name of the author'
            onChange={event => setNewAuthor(event.target.value)}/><br/>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            id="Url"
            placeholder='url of the blog'
            onChange={event => setNewUrl(event.target.value)}/><br/>
          <button type="submit">create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm