import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { modifyNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form, Input, Typography } from 'antd'

const BlogForm = () => {
  const { reset: resetTitle, ...newTitle } = useField('text')
  const { reset: resetAuthor, ...newAuthor } = useField('text')
  const { reset: resetUrl, ...newUrl } = useField('text')

  const { Title } = Typography
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: 0
    }
    try{
      dispatch(createBlog(newBlog))
      dispatch(modifyNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.title} added`,
        error: false
      }))
    } catch (exception) {
      dispatch(modifyNotification({
        message: 'Error posting the new blog',
        error: true
      }))
    }
    resetTitle()
    resetAuthor()
    resetUrl()
  }


  return(
    <div>
      <Title>Create new blog</Title>
      <Form>
        title:
        <Input {...newTitle}/><br/>
        author:
        <Input {...newAuthor}/><br/>
        url:
        <Input {...newUrl}/><br/>
        <Button type='primary' onClick={addBlog}>create</Button>
      </Form>
    </div>
  )
}

export default BlogForm