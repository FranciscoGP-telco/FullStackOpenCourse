
import axios from 'axios'
const url = 'http://localhost:3001/persons'


const listAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const createPerson = (person) => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}


export default { listAll , createPerson }