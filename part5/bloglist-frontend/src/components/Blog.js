import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blogStyle'>
      <div>
        {blog.title} <button onClick={toggleVisibility} style={hideWhenVisible}>view</button><br/>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes} <button>Like</button> <br/>
        {blog.author} <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>  
)
}

export default Blog