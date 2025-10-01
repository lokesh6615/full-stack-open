import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((a) => a.id === Number(id))

  return (
    <div>
      <h2>
        <strong>
          {anecdote.content} by {anecdote.author}{' '}
        </strong>
      </h2>

      <div> has {anecdote.votes} votes</div>
      <div>for more info see {anecdote.info}</div>
    </div>
  )
}

export default Anecdote
