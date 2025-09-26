import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/request'
import { useNotificationDispatch } from './NotificationContext'
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const getId = () => (100000 * Math.random()).toFixed(0)
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0,
    }
  }
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (err) => {
      console.log(err)
      notificationDispatch(err.response.data.error || err.message)
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(asObject(content))
    notificationDispatch(`${content} added successfully`)
    setTimeout(() => {
      notificationDispatch('')
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
