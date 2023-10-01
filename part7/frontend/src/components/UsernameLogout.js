import { logoutUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const UsernameLogout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <div>
      <a className='logged'>{user.name} is logged in</a>
      <form onSubmit={handleLogout}><button type="submit">Logout</button></form>
    </div>
  )
}

export default UsernameLogout