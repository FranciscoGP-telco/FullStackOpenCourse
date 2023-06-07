const Course = ({course}) => {
    const Header = ({name}) => {
        return(
          <h1>{name}</h1>
        )
      }
      
    const Content = ({parts}) => {
        return (
            parts.map(
            part => <p> {part.name} {part.exercises} </p>
            )
        )
    }
    
    const Total = ({parts}) => {
        let result = 0
        parts.forEach(value => {
          result += value.exercises
        })
        return(
          <p>Total of {result} exercises</p>
        )
    }

    return(
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;