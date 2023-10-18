import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { Button, Form, Input, Typography } from 'antd'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('text')
  const { Title } = Typography

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({
      username: username.value,
      password: password.value
    }))
    resetUsername()
    resetPassword()
  }

  return(
    <>
      <Title>Log in to the application</Title>
      <Form >
        Username
        <Input {...username}/>
        Password
        <Input.Password {...password}/>
        <Button onClick={handleLogin}>login</Button>
      </Form>
    </>
  )
}

export default LoginForm