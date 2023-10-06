import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

  return (
    <div>
      {blogs.map(blog =>
        <div className='blogStyle' key={blog.id}>
          <div className='blogTitle'>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link><br/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blogs