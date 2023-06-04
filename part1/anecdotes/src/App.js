import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = ({anecdote, vote}) => {
  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  //const points = Array(anecdotes.length).fill(0) 

  const randomAnecdoteNumber = (length) => {
    return Math.floor(Math.random() * length);
  }

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const copyPoints = [...vote]
    copyPoints[selected] += 1
    console.log(copyPoints)
    setVote(copyPoints)
  }

  const handleNext = () => {
    setSelected(randomAnecdoteNumber(anecdotes.length))
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} vote={vote[selected]} />
      <Button handleClick={() => handleVote()} text="Vote" />
      <Button handleClick={() => handleNext()} text="Next!" />
    </div>
  )
}

export default App