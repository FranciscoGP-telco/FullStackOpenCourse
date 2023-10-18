
import { useSelector } from 'react-redux'
import { Alert } from 'antd'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  })

  if (notification.message === '') return null
  if (notification.error) return  <Alert message={notification.message} type='error'/>
  return <Alert message={notification.message} type='success'/>
}

export default Notification