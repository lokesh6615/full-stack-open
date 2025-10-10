import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlicer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = userSlicer.actions

export const initializeUserDetails = () => {
  return async (dispatch) => {
    const userDetails = await userService.getUsersDetails()
    dispatch(setUsers(userDetails))
  }
}

export default userSlicer.reducer
