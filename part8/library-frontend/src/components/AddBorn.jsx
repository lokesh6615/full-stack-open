import { useState, useEffect } from 'react'
import { EDIT_BORN } from '../queries'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS } from '../queries'

const AddBorn = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn, result] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('Author not found')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    changeBorn({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AddBorn
