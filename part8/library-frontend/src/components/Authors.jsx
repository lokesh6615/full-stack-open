import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const ALL_AUTHORS = gql`
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `
  const authorsObj = useQuery(ALL_AUTHORS)
  const authors = authorsObj.data.allAuthors

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
