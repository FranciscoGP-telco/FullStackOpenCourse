import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const getCountry = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  console.log(`${baseUrl}/name/${name}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getCountry }
