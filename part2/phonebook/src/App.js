import { useState } from 'react'

const Numbers = ({persons, searchName}) => {
  return (
    <div>
      {persons.map(
        person => {
          if(searchName !== ''){
            if(person.name.includes(searchName)){
              return <p key={person.name}>{person.name} {person.number}</p>
            }
          }
        }
      )}
    </div>
  )
  /*persons.map(
    person => {
      console.log(searchName, person.name)
      console.log(person.name.includes(searchName))
      if(person.name.includes(searchName)){
        return <><p key={person.name}>{person.name} {person.number}</p></>
      } else {
        return ""
      }
    }
  )*/
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameKey = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberKey = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchKey = (event) => {
    setSearchName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name === newName)){
      alert(`${newName} is in the phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length +1
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
        <div>
          <form>
            <div>
              filter shown with: <input 
              value={searchName}
              onChange={handleSearchKey}/>
            </div>
          </form>
        </div>
      <h2>Add a new</h2>
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
        <Numbers persons={persons} searchName={searchName}/>
    </div>
  )
}

export default App