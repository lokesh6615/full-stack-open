import { useMutation, useSubscription } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { CREATE_BOOK } from '../queries'
import { ALL_AUTHORS } from '../queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    console.log('added Book---->', addedBook)
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const NewBook = (props) => {
  const [title, setTitle] = useState('biggboss2')
  const [author, setAuthor] = useState('nagarjuna')
  const [published, setPublished] = useState('2345')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState(['entertainment'])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log('Full Error Object ---->', error)

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const messages = error.graphQLErrors.map((e) => e.message).join('\n')
        console.log('GraphQL Error Messages ---->', messages)
        props.setError(messages)
      } else if (error.networkError) {
        console.log('Network Error ---->', error.networkError.message)
        props.setError(`Network Error: ${error.networkError.message}`)
      } else {
        console.log(
          'Unknown Error ---->',
          error.message || 'An unknown error occurred'
        )
        props.setError(error.message || 'An unknown error occurred')
      }
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      client.refetchQueries({
        include: [ALL_BOOKS],
      })
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log(title, author, Number(published), genres)

    createBook({
      variables: { title, author, published: Number(published), genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
