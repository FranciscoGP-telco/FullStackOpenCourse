import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    error: false
  },
  reducers: {
    changeModification(state, action) {
      return state = action.payload
    },
  }
})

export const { changeModification } = notificationSlice.actions


export const modifyNotification = (content) => {
  return dispatch => {
    dispatch(changeModification(content))
    setTimeout(() => {
      dispatch(changeModification({
        message: '',
        error: false
      }))
    }, 5000)
  }
}

export default notificationSlice.reducer