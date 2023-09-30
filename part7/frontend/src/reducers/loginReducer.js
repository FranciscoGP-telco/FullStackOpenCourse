import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'


const loginSlice = createSlice({
  name: 'login',
  initialState : null,
  reducers: {
    setUser(state, action){
      return state = action.payload
    }
  }
})

export const { setUser } = loginSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setUser(null))
  }
}

export const loginUser = content => {
  return async dispatch => {
    const username = content.username
    const password = content.password
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      return dispatch(setUser(user))
    } catch (exception) {
      console.log('Login error', exception)
    }
  }
}

export default loginSlice.reducer
