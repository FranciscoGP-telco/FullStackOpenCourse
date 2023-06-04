/*const Part = (props) => {
  return (
    props.exercises.map(
      exercise => <p id={exercise.id}> {exercise.part} {exercise.exerciseNum} </p>
      )
  )
}*/
/*
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
}*/
const Header = (props) => {
  return(
    <h1>props.course</h1>
  )
}

const Content = (props) => {
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  let result = 0
  console.log(props)
  props.exercises.forEach(value => {
    result += value
  })
  return(
    <p>Number of exercises {result}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <div>
      <Header course= {course} />
      <Content part = {part1} />
      <Content part = {part2} />
      <Content part = {part3} />
      <Total exercises = {[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}
export default App