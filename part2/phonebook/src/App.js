import { useState } from 'react'

const Numbers = ({persons}) => {
    return(
      <>
        {persons.map(
          person => <p key={person.name}>{person.name}</p>
        )}
      </>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleKeyPush = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name === newName)){
      alert(`${newName} is in the phonebook`)
    } else {
      const nameObject = {
        name: newName
      }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleKeyPush}/>
        </div>
        <div>
          <button type="addName">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Numbers persons={persons}/>
    </div>
  )
}

export default App