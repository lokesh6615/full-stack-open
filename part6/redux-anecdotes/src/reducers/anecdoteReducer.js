import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const updated = action.payload
      return state.map((anec) => (anec.id !== updated.id ? anec : updated))
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

export const addVote = (id) => {
  return async (dispatch, getState) => {
    const toUpdateAnecdote = getState().anecdotes.find(
      (anecdote) => anecdote.id === id
    )
    const updatedAnecdote = await anecdoteService.updateVote({
      ...toUpdateAnecdote,
      votes: toUpdateAnecdote.votes + 1,
    })
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
