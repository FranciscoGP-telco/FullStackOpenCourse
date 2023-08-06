import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog }) => {
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
      <div>
        {blog.title} <button onClick={toggleVisibility} style={hideWhenVisible}>view</button><br/>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={(e) => addLike(e, blog.id)}>Like</button> <br/>
        {blog.author} <button onClick={toggleVisibility}>Hide</button><br/>
        <button onClick={(e) => deleteBlog(e, blog)}>Delete</button>
      </div>
    </div>
  )
}

export default Blog