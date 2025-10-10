import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { useRef } from 'react'
import BlobForm from './BlobForm'
const Blogs = () => {
  const blogs = useSelector((state) => state.blog)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

  const handleAddBlog = async (formData, setFormData) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(formData))
      dispatch(handleNotification('Blob added successfull', 5))

      setFormData({})
    } catch (error) {
      dispatch(handleNotification('Failed to add blogs', 5))
      console.log('Error adding new blog', error)
    }
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlobForm createNew={handleAddBlog} />
      </Togglable>
      <br />
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
