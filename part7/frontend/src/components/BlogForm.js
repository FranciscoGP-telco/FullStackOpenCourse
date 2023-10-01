import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { useRef } from 'react'
import { modifyNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const { reset: resetTitle, ...newTitle } = useField('text')
  const { reset: resetAuthor, ...newAuthor } = useField('text')
  const { reset: resetUrl, ...newUrl } = useField('text')

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
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
    resetTitle()
    resetAuthor()
    resetUrl()
  }


  return(
    <div>
      <h2>Create new blog</h2>
      <Togglable buttonLabel='Create' cancelLabel='Hide' ref={blogFormRef}>
        <form onSubmit={addBlog}>
          title:
          <input {...newTitle}/><br/>
          author:
          <input {...newAuthor}/><br/>
          url:
          <input {...newUrl}/><br/>
          <button type="submit">create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm