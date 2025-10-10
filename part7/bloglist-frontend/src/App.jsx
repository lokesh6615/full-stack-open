import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
// import blogService from './services/blogs'
// import loginService from './services/login'
import Notification from './components/Notification'
import BlobForm from './components/BlobForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { handleNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  addLike,
  createBlog,
  deleteBlog,
  initializeBlogs,
} from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/loginReducer'
import { initializeUserDetails } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  const user = useSelector((state) => state.login)
  const userDetails = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUserDetails())
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      dispatch(handleNotification('Login successfull', 5))
    } catch (error) {
      dispatch(handleNotification('Invalid credentials', 5))
      console.log('Error while logging in user', error)
    }
  }

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

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(handleNotification('Logout successfully', 5))
  }

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
      dispatch(handleNotification('Blog deleted successfully', 5))
    } catch (error) {
      dispatch(handleNotification('failed to delete blog', 5))
      console.log('Error while deleting likes', error)
    }
  }

  return (
    <div>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div>
                <h2>blogs</h2>
                <h3>
                  {user.username} logged in
                  <button onClick={handleLogout}>logout</button>
                </h3>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlobForm createNew={handleAddBlog} />
                </Togglable>
                <br />
                {sortedBlogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    updateLikes={() => increaseLikes(blog.id)}
                    deleteBlog={() => handleDeleteBlog(blog.id)}
                  />
                ))}
              </div>
            ) : (
              <Togglable buttonLabel="Login">
                <LoginForm
                  username={username}
                  password={password}
                  handleUserNameChange={(e) => setUsername(e.target.value)}
                  handlePasswordChange={(e) => setPassword(e.target.value)}
                  handleSubmit={handleLogin}
                />
              </Togglable>
            )
          }
        />
        <Route path="/users" element={<Users users={userDetails} />} />
      </Routes>
    </div>
  )
}

export default App
