
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  })

  if (notification.message === '') return null
  if (notification.error) return <div className='error'>{notification.message}</div>
  return <div className='operation'>{notification.message}</div>
}

export default Notification