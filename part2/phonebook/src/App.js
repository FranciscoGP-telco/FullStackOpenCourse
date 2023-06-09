import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({searchName, handleSearchKey}) => {
  return(
    <div>
    <form>
      <div>
        filter shown with: <input 
        value={searchName}
        onChange={handleSearchKey}/>
      </div>
    </form>
  </div>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameKey, handleNumberKey}) => {
  return(
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
  )
}

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
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
      .listAll()
      .then(initialList => {
        setPersons(initialList)
      })
      .catch(error => {
        console.log(`Error ${error} getting the list of persons`)
      })
  }, [])


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

      personService
        .createPerson(personObject)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          console.log(`Error ${error} adding the person`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter persons={persons} handleSearchKey={handleSearchKey}/>
      <h3>Add a new</h3>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameKey={handleNameKey} handleNumberKey={handleNumberKey}/>
      <h3>Numbers</h3>
        <Numbers persons={persons} searchName={searchName}/>
    </div>
  )
}

export default App