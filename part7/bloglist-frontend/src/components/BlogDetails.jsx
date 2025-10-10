import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addLike, deleteBlog, addComment } from '../reducers/blogReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const BlogDetails = () => {
  const [comment, setComment] = useState('')
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

  const handleAddComment = (e) => {
    e.preventDefault()
    try {
      dispatch(addComment({ id: requiredBlog.id, comment }))
      setComment('')
      dispatch(handleNotification('Thanks for your comment', 5))
    } catch (error) {
      dispatch(handleNotification('failed to update comment', 5))
      console.log('Error while updating comment', error)
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
          <Button
            variant="outlined"
            onClick={() => {
              increaseLikes(requiredBlog.id)
            }}
            sx={{ m: 1 }}
          >
            like
          </Button>
        </span>
        <br />
        {requiredBlog.author}
        <br />
        <h3>
          <b>Comments</b>
        </h3>
        <ul>
          {requiredBlog.comments.map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleAddComment}>
          <h3>Add comment</h3>
          <TextField
            id="filled-multiline-flexible"
            label="comment"
            multiline
            maxRows={4}
            variant="filled"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </form>
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
