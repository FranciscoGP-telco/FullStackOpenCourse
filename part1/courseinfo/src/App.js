const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    props.exercises.map(
      exercise => <p id={exercise.id}>
        {exercise.part} 
        {exercise.exerciseNum}
      </p>
      )
  )
}

const Total = (props) => {
  let result = 0
  props.exercises.forEach(exercise => result += exercise.exerciseNum)
  return (
    <p>Number of exercises {result}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises = [
    { id: 1, part: 'Fundamentals of React', exerciseNum: 10 },
    { id: 2, part: 'Using props to pass data', exerciseNum: 7 },
    { id: 3, part: 'State of a component', exerciseNum: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App