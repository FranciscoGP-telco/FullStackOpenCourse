import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return state = action.payload
    },
    removeNotification(state, action){
      return state = ''
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions


export const modifyNotification = (content, time) => {
  return dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer