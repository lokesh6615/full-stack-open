import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'welcome...',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    },
    setVoteNotification(state, action) {
      const id = action.payload.id
      const anecdotes = action.payload.anecdotes
      const votedAnecdote = anecdotes.find((anecdote) => id === anecdote.id)
      return `you voted ${votedAnecdote.content}`
    },
  },
})

export const { setNotification, clearNotification, setVoteNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
