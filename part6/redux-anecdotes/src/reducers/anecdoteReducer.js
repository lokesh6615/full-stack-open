import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const toVote = state.find((anecdote) => anecdote.id === id)
      if (toVote) {
        toVote.votes += 1
      }
    },
    appendNewAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, appendNewAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await anecdoteService.getAll()
    dispatch(setAnecdotes(response))
  }
}
const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const addNewAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(asObject(newAnecdote))
    dispatch(appendNewAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer
