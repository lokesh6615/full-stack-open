import { addNewAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'
import { useDispatch } from 'react-redux'
const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0,
    }
  }
  const dispatch = useDispatch()
  const addAnecdote = async (e) => {
    e.preventDefault()
    const data = e.target.anecdote.value
    e.target.anecdote.value = ''
    const response = await anecdoteService.createNew(asObject(data))
    dispatch(addNewAnecdote(response))
    dispatch(setNotification(`anecdote added successfully '${data}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
