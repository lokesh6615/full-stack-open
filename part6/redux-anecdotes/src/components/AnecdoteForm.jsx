import { handleNotification } from '../reducers/notificationReducer'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

import { useDispatch } from 'react-redux'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (e) => {
    e.preventDefault()
    const data = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addNewAnecdote(data))
    dispatch(handleNotification(`anecdote added successfully '${data}'`, 5))
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
