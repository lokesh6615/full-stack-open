import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'
const Books = (props) => {
  const [allGenres, setAllGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  const booksObj = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })

  const unfilteredBooksObj = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  })

  useEffect(() => {
    if (unfilteredBooksObj.data && unfilteredBooksObj.data.allBooks) {
      const genresFromBooks = unfilteredBooksObj.data.allBooks.flatMap(
        (book) => book.genres || []
      )
      const uniqueGenres = [...new Set(genresFromBooks)]
      setAllGenres(uniqueGenres)
    }
  }, [unfilteredBooksObj.data])

  if (!props.show) {
    return null
  }

  if (booksObj.loading || unfilteredBooksObj.loading) {
    return <div>loading...</div>
  }
  if (booksObj.error) {
    return <div>Error: {booksObj.error.message}</div>
  }
  if (unfilteredBooksObj.error) {
    return <div>Error: {unfilteredBooksObj.error.message}</div>
  }

  const books = booksObj.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((genre) => {
          return (
            <button key={genre} onClick={() => setSelectedGenre(genre)}>
              {genre}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Books
