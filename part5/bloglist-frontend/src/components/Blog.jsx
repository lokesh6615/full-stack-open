import { useState } from 'react'
const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  console.log('user--->', blog.user)

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
        likes {blog.likes} <button onClick={updateLikes}>like</button>
        <br />
        {blog.author}
        <br />
        {user?.username === blog?.user.username && (
          <button onClick={deleteBlog}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
