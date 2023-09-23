import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState : [],
  reducers: {
    updateBlog(state, action){
      const content = action.payload
      return state
        .map(blog => blog.id !== content.id ? blog : content)
        .sort((a, b) => a.likes < b.likes ? 1 : -1)
    },
    appendBlog(state, action){
      state.push(action.payload)
    },
    setBlogs(state, action){
      return action.payload
    }
  }
})

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.postBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const addVote = content => {
  return async dispatch => {
    const blogToUpdate = await blogService.getBlog(content.id)
    const previousVotes = blogToUpdate.likes
    const changedBlog = {
      ...blogToUpdate,
      likes: previousVotes + 1
    }
    console.log('hola estoy actualizado?', changedBlog)
    const updatedBlog = await blogService.update(changedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer