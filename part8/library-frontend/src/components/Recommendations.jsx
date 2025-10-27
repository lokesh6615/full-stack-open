import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { LOGEDINUSER, ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'
const Recommendations = (props) => {
  const loggedInUser = useQuery(LOGEDINUSER)
  const booksObj = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (loggedInUser.loading) {
    return <div>loading...</div>
  }
  if (loggedInUser.error) {
    return <div>Error: {loggedInUser.error.message}</div>
  }

  const books = booksObj.data.allBooks.filter((book) =>
    book.genres.includes(loggedInUser.data.me.favoriteGenre)
  )

  return (
    <div>
      <h2>Recommendations</h2>
      <h3>Books in favorite genre patterns</h3>

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
    </div>
  )
}

export default Recommendations
