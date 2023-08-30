import { createContext, useReducer, useContext } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case "ESTABLISH":
        return action.payload
    case "REMOVE":
        return null
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(reducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotify = () => {
  const valueAndDispatch = useContext(NotificationContext)
  const dispatch = valueAndDispatch[1]
  return (payload) => {
    dispatch({ type: 'ESTABLISH', payload})
    setTimeout(() => {
      dispatch({ type: 'REMOVE' })
    }, 5000)
  } 
}

export default NotificationContext