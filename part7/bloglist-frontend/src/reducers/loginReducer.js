import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlicer = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = loginSlicer.actions

export const loginUser = (userName, password) => {
  return async (dispatch) => {
    const user = await loginService.login(userName, password)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user.data))
    blogService.setToken(user.data.token)
    dispatch(setUser(user.data))
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      dispatch(setUser(userData))
      blogService.setToken(userData.token)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(clearUser())
  }
}

export default loginSlicer.reducer
