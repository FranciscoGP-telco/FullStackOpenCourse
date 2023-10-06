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
    <>
      <em>{user.name} is logged in <form onSubmit={handleLogout} style={{ display: 'inline' }}><button type="submit">Logout</button></form></em>
    </>
  )
}

export default UsernameLogout