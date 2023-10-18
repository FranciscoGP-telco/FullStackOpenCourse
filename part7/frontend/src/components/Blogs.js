import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
import { List, Typography } from 'antd'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogListRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const { Title } = Typography

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

  return (
    <>
      <Title>Blogs</Title>
      <List
        itemLayout="horizontal"
        dataSource={blogs}
        renderItem={(blog) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}
            />
          </List.Item>
        )}
      />
      <div>
        <Togglable buttonLabel='Create new' cancelLabel='Hide' ref={blogListRef}>
          <BlogForm />
        </Togglable>
      </div>
    </>
  )
}

export default Blogs