import { useDispatch, useSelector } from 'react-redux'
import { addVote, getAnecdoteById } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>{
      if ( state.filter === '') {
        return state.anecdotes
      }
      return state.anecdotes
      .filter(anecdote => anecdote.content.includes(state.filter))
    }
  )

  const vote = (id) => {
    const anecdoteVoted = anecdotes
    .filter(anecdote => anecdote.id === id)
    dispatch(addVote(id))
    dispatch(addNotification(`You voted '${anecdoteVoted[0].content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes