import { logoutUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, Button } from 'antd'

const UsernameLogout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <>
      <Popover content={<Button danger onClick={handleLogout}>Logout</Button>} trigger="click">
        <Button>{user.name}</Button>
      </Popover>
    </>
  )
}

export default UsernameLogout