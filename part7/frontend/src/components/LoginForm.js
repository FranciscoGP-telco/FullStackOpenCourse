import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({
      username: username.value,
      password: password.value }))
    username.reset()
    password.reset()
  }

  return(
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username}/>
        </div>
        <div>
          password
          <input {...password}/>
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm