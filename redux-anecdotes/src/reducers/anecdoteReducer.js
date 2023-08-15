import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    addVote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const previousVotes = anecdoteToChange.votes
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: previousVotes + 1
      }
      return state
      .map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
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

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

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
export default anecdoteSlice.reducer