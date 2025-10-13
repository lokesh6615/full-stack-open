import { useState, useEffect } from 'react'
import { EDIT_BORN } from '../queries'
import { useMutation, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS } from '../queries'

const AddBorn = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authorsObj = useQuery(ALL_AUTHORS)

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

  if (authorsObj.loading) {
    return <div>loading...</div>
  }
  if (authorsObj.error) {
    return <div>Error: {authorsObj.error.message}</div>
  }

  const authors = authorsObj.data.allAuthors

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
          select author name
          <select name="authorNames" onChange={(e) => setName(e.target.value)}>
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
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
