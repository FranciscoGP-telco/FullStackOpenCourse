const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    props.parts.map(
      part => <p> {part.name} {part.exercises} </p>
      )
  )
}

const Total = (props) => {
  let result = 0
  console.log(props)
  props.parts.forEach(value => {
    result += value.exercises
  })
  return(
    <p>Number of exercises {result}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  
  return (
    <div>
      <Header course= {course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
export default App