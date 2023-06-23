
import axios from 'axios'
const url = 'https://fullstackopencourse-3.onrender.com/api/persons'


const listAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const createPerson = (person) => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    console.log(`${url}/${id}`)
    return request.then()
}

const updateNumber = (id, newPerson) => {
    const request = axios.put(`${url}/${id}`, newPerson)
    return request.then(response => response.data)
}
export default { listAll , createPerson, deletePerson, updateNumber }