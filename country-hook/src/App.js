import React, { useState, useEffect } from 'react'
import countryService from './services/countries'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countryService
      .getCountry(name)
      .then(countryFound => {
        setCountry(countryFound)
      })
      .catch(error => {
        console.log(`Error ${error}. Country don't found`)
        setCountry({
          found: 'no'
        })
      })
  }, [name])
  

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.official} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.commom}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App