import { useState } from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <br />
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes} <button>like</button>
        <br />
        {blog.author}
      </div>
    </div>
  )
}

export default Blog
