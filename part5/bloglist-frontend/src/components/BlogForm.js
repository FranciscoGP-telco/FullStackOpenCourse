import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  
  return(
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        title:
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={event => setNewTitle(event.target.value)}/><br/>
        author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={event => setNewAuthor(event.target.value)}/><br/>
        url:
        <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={event => setNewUrl(event.target.value)}/><br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm