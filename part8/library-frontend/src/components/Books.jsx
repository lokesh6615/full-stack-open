import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'
const Books = (props) => {
  const [allGenres, setAllGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  const booksObj = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (booksObj.data) {
      const genresFromBooks = booksObj.data.allBooks.flatMap(
        (book) => book.genres
      )
      const uniqueGenres = [...new Set(genresFromBooks)]
      setAllGenres(uniqueGenres)
    }
  }, [booksObj.data])

  if (!props.show) {
    return null
  }

  if (booksObj.loading) {
    return <div>loading...</div>
  }
  if (booksObj.error) {
    return <div>Error: {booksObj.error.message}</div>
  }

  const books =
    selectedGenre === null
      ? booksObj.data.allBooks
      : booksObj.data.allBooks.filter((book) =>
          book.genres.includes(selectedGenre)
        )

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
            <button onClick={() => setSelectedGenre(genre)}>{genre}</button>
          )
        })}
      </div>
    </div>
  )
}

export default Books
