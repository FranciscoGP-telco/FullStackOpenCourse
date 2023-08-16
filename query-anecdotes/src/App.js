import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, addVote } from './requests'


import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const handleVoteMutation = useMutation(addVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    handleVoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  console.log(result)

  if ( result.isLoading ){
    return <div>Loading data...</div>
  }

  if ( result.isError ){
    return <div>Anecdoce service not available due to problems in server</div>
  }
  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
