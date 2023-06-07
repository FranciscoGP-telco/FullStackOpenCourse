import { useState } from 'react'

const Numbers = ({persons}) => {
    return(
      <>
        {persons.map(
          person => <p key={person.name}>{person.name} {person.number}</p>
        )}
      </>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '34-666111454' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameKey = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberKey = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name === newName)){
      alert(`${newName} is in the phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log(personObject)
      setPersons(persons.concat(personObject))
      console.log(persons)
    }
    setNewName('')
    setNewNumber('')
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameKey}/>
        </div>
          <div>
            number: <input 
            value={newNumber}
            onChange={handleNumberKey}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Numbers persons={persons}/>
    </div>
  )
}

export default App