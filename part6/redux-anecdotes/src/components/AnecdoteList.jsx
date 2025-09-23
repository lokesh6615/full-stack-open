import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  setVoteNotification,
} from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    )
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(setVoteNotification({ id, anecdotes }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AnecdoteList
