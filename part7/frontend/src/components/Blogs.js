import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogListRef = useRef()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

  return (
    <>
      <div>
        <Togglable buttonLabel='Create new' cancelLabel='Hide' ref={blogListRef}>
          <BlogForm />
        </Togglable>
      </div>
      <div>
        {blogs.map(blog =>
          <div className='blogStyle' key={blog.id}>
            <div className='blogTitle'>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link><br/>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Blogs