import { useState } from 'react'

const Feedback = () => {
  return (<h1>give feedback</h1>)
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) =>{
  let all = good + neutral + bad
  let average = ((good*1) + (bad*-1)) / all
  let positivePercentage = good / all * 100
  if (all > 0) {
    return (
      <>
      <h1>Statistics</h1>
      <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positivePercentage" value={positivePercentage} />
      </table>
      </>
    )
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good +1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Feedback />
      <Button handleClick={() => handleGoodClick()} text="good" />
      <Button handleClick={() => handleNeutralClick()} text="neutral" />
      <Button handleClick={() => handleBadClick()} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App