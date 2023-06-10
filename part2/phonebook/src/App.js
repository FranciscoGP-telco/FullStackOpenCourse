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

const Numbers = ({persons, searchName, deleteFromDb}) => {
  return (
    <div>
      {persons.map(
        person => {
          if(searchName !== ''){
            if(person.name.includes(searchName)){
              return (
              <>
                <p key={person.name}>{person.name} {person.number}</p><button onClick={(event) => deleteFromDb(event, person.id)}>Delete</button>
              </>)
            }
          }
        }
      )}
    </div>
  )
}


const OperationDone = ({message}) => {
  if (message === '') {
    return null
  }
  return (
    <div className='operation'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState('')

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
      const personUpdate = persons.find(person => person.name === newName)
      if(window.confirm(`${personUpdate.name} is already added to the phonebook. DO you want to replace the old number?`)){
        personUpdate.number = newNumber
        personService
        .updateNumber(personUpdate.id, personUpdate)
          .then(returnPerson => {
            setPersons(persons.map(person => person.id === returnPerson.id ? person : returnPerson))
            setMessage(`Modify the number of ${returnPerson.name}`)
            setTimeout(() => {
              setMessage('')
            }, 6000)
            
          })
      }
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
          setMessage(`Insert: ${returnPerson.name}`)
          setTimeout(() => {
            setMessage('')
          }, 6000)
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          console.log(`Error ${error} adding the person`)
        })
    }
  }

  const deleteFromDb = (event, id) => {
    event.preventDefault()
    const personToDelete = persons.find(person => person.id === id).name
    console.log(personToDelete)
    if(window.confirm(`Do you want to delete ${personToDelete} from the DB?`)){
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        console.log(persons)
      })
      .catch(error => {
        console.log(`Error ${error} deleting the user with id ${id}`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <OperationDone message={message} />
        <Filter persons={persons} handleSearchKey={handleSearchKey}/>
      <h3>Add a new</h3>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameKey={handleNameKey} handleNumberKey={handleNumberKey}/>
      <h3>Numbers</h3>
        <Numbers persons={persons} searchName={searchName} deleteFromDb={deleteFromDb}/>
    </div>
  )
}

export default App