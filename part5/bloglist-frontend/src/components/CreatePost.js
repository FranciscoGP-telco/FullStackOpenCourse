

const CreatePost = ({newTitle, newAuthor, newUrl, handlePost, handleNewTitle, handleNewAuthor, handleNewUrl}) => {
  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={handlePost}>
        title:
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={handleNewTitle}/><br/>
        author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleNewAuthor}/><br/>
        url:
        <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleNewUrl}/><br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreatePost