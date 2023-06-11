import { useState, useEffect } from "react";
import countriesService from './services/countries'

const FindCountries = ({searchCountry, handleSearchKey}) => {
  return(
    <div>
      <form>
        <div>
          find countries <input 
          value={searchCountry}
          onChange={handleSearchKey}/>
        </div>
      </form>
    </div>
  )
}

const CountryData = ({countries, searchCountry}) => {
  if(countries){
    const filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(searchCountry.toUpperCase()))
    console.log(filteredCountries.length)
    if(filteredCountries.length === 1) {
      return <ShowCountryData country={filteredCountries[0]}/>
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return( 
        <div>
          <ul>
        {filteredCountries.map(
          country => <li>{country.name.common}</li>
        )}
        </ul>
      </div>)
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify the filter</p>
    }
  }
}

const ShowCountryData = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <p>Languages: </p>
      <ul>
        {Object.values(country.languages).map(value => <li>{value}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] =  useState(null)
  const [searchCountry, setSearchCountry] =  useState('')

  useEffect(() => {
    countriesService
      .listAll()
      .then(listCountries => {
        setCountries(listCountries)
      })
      .catch(error =>{
        console.log(`Error ${error}`)
      })
  },[])

  const handleSearchKey = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <h1>Countries info API</h1>
      <FindCountries countries={countries} handleSearchKey={handleSearchKey}/>
      <CountryData countries={countries} searchCountry={searchCountry} />
    </div>
  );
}

export default App;
