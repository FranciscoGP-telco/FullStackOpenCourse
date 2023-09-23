import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, userName }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event, id) => {
    event.preventDefault()
    updateLikes(id)
  }

  const deleteBlog = (event, blog) => {
    event.preventDefault()
    if (window.confirm(`Remove the blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className='blogStyle'>
      <div className='blogTitle'>
        {blog.title} <button onClick={toggleVisibility} style={hideWhenVisible}>view</button><br/>
      </div>
      <div style={showWhenVisible} className='togglableContent' >
        <p>{blog.url}</p>
        <p className='likes'>likes {blog.likes} <button id={blog.id} onClick={(e) => addLike(e, blog.id)}>Like</button></p>
        <p>{blog.author}</p> <button onClick={toggleVisibility}>Hide</button><br/>
        {userName === blog.author && <button onClick={(e) => deleteBlog(e, blog)}>Delete</button>}
      </div>
    </div>
  )
}

export default Blog