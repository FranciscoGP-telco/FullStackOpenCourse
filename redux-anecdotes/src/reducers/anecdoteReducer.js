import { createSlice } from '@reduxjs/toolkit'

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
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer