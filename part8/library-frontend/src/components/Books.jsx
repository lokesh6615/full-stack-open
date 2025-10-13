import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
const Books = (props) => {
  if (!props.show) {
    return null
  }

  const booksObj = useQuery(ALL_BOOKS)

  if (booksObj.loading) {
    return <div>loading...</div>
  }
  if (booksObj.error) {
    return <div>Error: {booksObj.error.message}</div>
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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
