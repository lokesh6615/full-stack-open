import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { handleNotification } from '../reducers/notificationReducer'

const BlogDetails = () => {
  const blogId = useParams().id
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const requiredBlog = blogs.find((blog) => blog.id === blogId)
  if (!requiredBlog) {
    return <div>Loading blog...</div>
  }
  const isOwner = user.username === requiredBlog.user.username

  const increaseLikes = async (id) => {
    try {
      const blogToEdit = blogs.find((blog) => blog.id === id)
      const updatedData = { ...blogToEdit, likes: blogToEdit.likes + 1 }
      dispatch(addLike(updatedData))
      dispatch(handleNotification('your like has been recorded', 5))
    } catch (error) {
      dispatch(handleNotification('failed to update likes', 5))
      console.log('Error while updating likes', error)
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      const blogToDelete = blogs.find((blog) => blog.id === id)
      const confirmation = confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
      if (confirmation) {
        dispatch(deleteBlog(blogToDelete))
      }
      navigate('/')
      dispatch(handleNotification('Blog deleted successfully', 5))
    } catch (error) {
      dispatch(handleNotification('failed to delete blog', 5))
      console.log('Error while deleting likes', error)
    }
  }

  return (
    <div>
      {requiredBlog.title} {requiredBlog.author}
      <br />
      <div>
        {requiredBlog.url}
        <br />
        <span>
          likes {requiredBlog.likes}{' '}
          <button
            onClick={() => {
              increaseLikes(requiredBlog.id)
            }}
          >
            like
          </button>
        </span>
        <br />
        {requiredBlog.author}
        <br />
        {isOwner && (
          <button
            onClick={() => {
              handleDeleteBlog(requiredBlog.id)
            }}
          >
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default BlogDetails
