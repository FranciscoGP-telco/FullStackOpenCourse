import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useField } from '../hooks'
import { modifyNotification } from '../reducers/notificationReducer'
import { addVote, removeBlog, initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = () => {
  const dispatch = useDispatch()
  const { reset: resetComment, ...newComment } = useField('text')
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
        console.error(exception)
        dispatch(modifyNotification({
          message: 'Error deleting the blog',
          error: true
        }))
      }
    }
  }

  const addComment = async (event, id) => {
    event.preventDefault()
    const comment = {
      comments: newComment.value
    }
    try{
      const blogWithNewComment = await blogService.addComment(id, comment)
      dispatch(updateBlog(blogWithNewComment))
      dispatch(modifyNotification({
        message: `Added new comment: ${newComment.value}`,
        error: false
      }))
      resetComment()
    } catch (exception) {
      console.error(exception)
      dispatch(modifyNotification({
        message: 'Error adding the comment',
        error: true
      }))
    }
  }

  return (
    <div>
      {blog.map(blog =>
        <div key={blog.id}>
          <div>
            <h2>{blog.title}</h2>
          </div>
          <div>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button id={blog.id} onClick={(e) => addLikes(e, blog.id)}>Like</button></p>
            <p>added by {blog.author}</p><br/>
            <h3>Comments</h3>
            <ul>
              {blog.comments.map((comment, key) =>
                <li key={key}>{comment}</li>
              )}
            </ul>
            <h3>Add a coment:</h3>
            <form onSubmit={(e) => addComment(e, blog.id)}>
              Comment:
              <input {...newComment}/><br/>
              <button type="submit">add</button>
            </form>
            <h3>Delete the blog:</h3>
            <button onClick={(e) => deleteBlog(e, blog.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog