import propTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsername,
  handlePassword
}) => {
  return(
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="Username"
            name="Username"
            onChange={handleUsername}/>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="Password"
            name="Password"
            onChange={handlePassword}/>
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  handleLogin: propTypes.func.isRequired,
  handleUsername: propTypes.func.isRequired,
  handlePassword: propTypes.func.isRequired
}
export default LoginForm