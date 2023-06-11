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

const CountryData = ({countries, searchCountry, showCountryInfo, changeCountryInfo}) => {
  if(countries){
    const filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(searchCountry.toUpperCase()))
    if(filteredCountries.length === 1) {
      changeCountryInfo(filteredCountries[0])
      return null
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return( 
        <div>
          <ul>
        {filteredCountries.map(
          country => <>
            <li>{country.name.common}</li> 
            <button onClick={(event) => showCountryInfo(event, country)}>show</button>
          </>
        )}
        </ul>
      </div>)
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify the filter</p>
    }
  }
}

const ShowCountryData = ({countryInfo}) => {
  console.log(countryInfo)
  if(countryInfo){
    return(
      <div>
        <h1>{countryInfo.name.common}</h1>
        <p>Capital {countryInfo.capital[0]}</p>
        <p>Area {countryInfo.area}</p>
        <p>Languages: </p>
        <ul>
          {Object.values(countryInfo.languages).map(value => <li>{value}</li>)}
        </ul>
        <img src={countryInfo.flags.png} alt={countryInfo.flags.alt}/>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] =  useState(null)
  const [searchCountry, setSearchCountry] =  useState('')
  const [countryInfo, setCountryInfo] =  useState(null)

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

  const changeCountryInfo = (country) => {
    setCountryInfo(country)
  }
  
  const showCountryInfo = (event, country) => {
    event.preventDefault()
    setCountryInfo(country)
    console.log(country)
  }


  return (
    <div>
      <h1>Countries info API</h1>
      <FindCountries countries={countries} handleSearchKey={handleSearchKey}/>
      <CountryData countries={countries} searchCountry={searchCountry} showCountryInfo={showCountryInfo} changeCountryInfo={changeCountryInfo}/>
      <ShowCountryData countryInfo={countryInfo}/>
    </div>
  );
}

export default App;
