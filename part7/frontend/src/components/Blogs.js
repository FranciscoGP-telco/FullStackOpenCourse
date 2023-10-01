import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { modifyNotification } from '../reducers/notificationReducer'
import { addVote, removeBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blogs = () => {

  const dispatch = useDispatch()
  const blogListRef = useRef()
  const blogs = useSelector(state => state.blogs)

  const addLikes = async (event, id) => {
    event.preventDefault()
    try{
      const blogToUpdate = await blogService.getBlog(id)
      dispatch(addVote(blogToUpdate))
      dispatch(modifyNotification({
        message: `Like added to blog ${blogToUpdate.title}`,
        error: false
      }))
    } catch (exception) {
      dispatch(modifyNotification({
        message: 'Error updating the likes',
        error: true
      }))
    }
  }

  const deleteBlog = async (event, id) => {
    event.preventDefault()
    const blogToRemove = await blogService.getBlog(id)
    if (window.confirm(`Remove the blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      try{
        dispatch(removeBlog(blogToRemove))
        dispatch(modifyNotification({
          message: `Remove blog ${blogToRemove.title}`,
          error: false
        }))
      } catch (exception) {
        console.log(exception)
        dispatch(modifyNotification({
          message: 'Error deleting the blog',
          error: true
        }))
      }
    }
  }

  return (
    <div>
      {blogs.map(blog =>
        <div className='blogStyle' key={blog.id}>
          <div className='blogTitle'>
            {blog.title}<br/>
          </div>
          <Togglable buttonLabel='Show' cancelLabel='Hide' ref={blogListRef}>
            <div>
              <p>{blog.url}</p>
              <p className='likes'>likes {blog.likes} <button id={blog.id} onClick={(e) => addLikes(e, blog.id)}>Like</button></p>
              <p>{blog.author}</p><br/>
              <button onClick={(e) => deleteBlog(e, blog.id)}>Delete</button>
            </div>
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default Blogs