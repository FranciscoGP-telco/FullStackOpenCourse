const Part = (props) => {
  return (
    props.exercises.map(
      exercise => <p id={exercise.id}> {exercise.part} {exercise.exerciseNum} </p>
      )
  )
}

const App = () => {
  const exercises = [
    { id: 1, part: 'Fundamentals of React', exerciseNum: 10 },
    { id: 2, part: 'Using props to pass data', exerciseNum: 7 },
    { id: 3, part: 'State of a component', exerciseNum: 14 }
  ]

  return (
    <div>
      <Part exercises={exercises} />
    </div>
  )
}

export default App