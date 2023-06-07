const Course = ({courses}) => {
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
        const initialValue = 0
        const sum = parts.reduce(
            (accumulator, currentValue) => 
            accumulator + currentValue.exercises, initialValue
        )
        return(
            <p>Total of  {sum} exercises</p>
        )
    }

    return(
    <div>
        {courses.map(course => (
            <>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </>
        ))}
    </div>
    )
}

export default Course;
