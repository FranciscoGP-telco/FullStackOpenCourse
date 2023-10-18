import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useField } from '../hooks'
import { modifyNotification } from '../reducers/notificationReducer'
import { addVote, removeBlog, initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import { Descriptions, Button, List, Form, Input } from 'antd'
import { LikeOutlined } from '@ant-design/icons'

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
    <>
      {blog.map(blog =>
        <Descriptions title={blog.title} key={blog.id} bordered='true'>
          <Descriptions.Item label='URL'>{blog.url}</Descriptions.Item>
          <Descriptions.Item label='Likes'>{blog.likes}</Descriptions.Item>
          <Descriptions.Item label='Add Like'><Button id={blog.id} onClick={(e) => addLikes(e, blog.id)} icon={<LikeOutlined />}>Like</Button></Descriptions.Item>
          <Descriptions.Item label='Author'>{blog.author}</Descriptions.Item>
          <Descriptions.Item label='Comments'>
            <List
              itemLayout="horizontal"
              dataSource={blog.comments}
              renderItem={(comment) => (
                <List.Item>{comment}</List.Item>
              )}
            />
            <Form>
              Add a Comment:
              <Input {...newComment}/><br/>
              <Button onClick={(e) => addComment(e, blog.id)}>add</Button>
            </Form>
          </Descriptions.Item>
          <Descriptions.Item label='Delete Blog'><Button danger trigger='click' onClick={(e) => deleteBlog(e, blog.id)}>Delete</Button></Descriptions.Item>
        </Descriptions>
      )}
    </>
  )
}

export default Blog