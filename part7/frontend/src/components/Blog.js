import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { modifyNotification } from '../reducers/notificationReducer'
import { addVote, removeBlog, initializeBlogs } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = () => {
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')
  const blogIdFromUrl = match.params.id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(blog => blog.id === blogIdFromUrl)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

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
      {blog.map(blog =>
        <div className='blogStyle' key={blog.id}>
          <div className='blogTitle'>
            {blog.title}<br/>
          </div>
          <div>
            <p>{blog.url}</p>
            <p className='likes'>likes {blog.likes} <button id={blog.id} onClick={(e) => addLikes(e, blog.id)}>Like</button></p>
            <p>{blog.author}</p><br/>
            <button onClick={(e) => deleteBlog(e, blog.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog