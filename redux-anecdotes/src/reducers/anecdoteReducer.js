import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    updateAnecdote(state, action){
      const content = action.payload
      return state
      .map(anecdote => anecdote.id !== content.id ? anecdote : content)
      .sort((a, b) => a.votes < b.votes ? 1 : -1)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.postAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = content => {
  return async dispatch => {
    const anecdoteToUpdate = await anecdoteService.getAnecdote(content[0].id)
    const previousVotes = anecdoteToUpdate.votes
    const changedAnecdote = {
      ...anecdoteToUpdate,
      votes: previousVotes + 1
    }
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer