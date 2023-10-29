import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const resultAuthors = useQuery(ALL_AUTHORS)
  const [ changeBirthyear, result ] = useMutation(EDIT_BIRTHYEAR)
  
  useEffect(() => {
    if (result.data && result.data.editAuthor === null){
      console.log('Error editying the birthdate')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()
    console.log('Modifying birthdate...')

    changeBirthyear( { variables: { name, born }} )
    setName('')
    setBorn('')
  }

  if(resultAuthors.loading) {
    return <div>Loading...</div>
  }

  const authors = resultAuthors.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            author:
            <select onChange={({ target }) => setName(target.value)}>
              {authors.map((a) => (
                <option value={a.name}>{a.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
        </form>
    </div>
  )
}

export default Authors
