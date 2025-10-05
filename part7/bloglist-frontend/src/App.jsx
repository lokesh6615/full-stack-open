import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlobForm from './components/BlobForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { handleNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userFromLocalStorage = JSON.parse(loggedInUser)
      setUser(userFromLocalStorage)
      blogService.setToken(userFromLocalStorage.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user.data))
      setUser(user.data)
      blogService.setToken(user.data.token)

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
      const newBlob = await blogService.addBlog(formData)
      setBlogs(blogs.concat(newBlob))
      dispatch(handleNotification('Blob added successfull', 5))

      setFormData({})
    } catch (error) {
      dispatch(handleNotification('Failed to add blogs', 5))
      console.log('Error adding new blog', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(handleNotification('Logout successfully', 5))
    setUser(null)
  }

  const increaseLikes = async (id) => {
    try {
      const blogToEdit = blogs.find((blog) => blog.id === id)
      const updatedData = { ...blogToEdit, likes: blogToEdit.likes + 1 }
      const response = await blogService.editBlog(id, updatedData)
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : response
      )
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
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
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
      dispatch(handleNotification('Blog deleted successfully', 5))
    } catch (error) {
      dispatch(handleNotification('failed to delete blog', 5))
      console.log('Error while deleting likes', error)
    }
  }

  return (
    <div>
      {!user && (
        <div>
          <Notification />
          <Togglable buttonLabel="Login">
            <LoginForm
              username={username}
              password={password}
              handleUserNameChange={(e) => setUsername(e.target.value)}
              handlePasswordChange={(e) => setPassword(e.target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div>
      )}

      {user && (
        <div>
          <Notification />
          <h2>blogs</h2>
          <h3>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </h3>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlobForm createNew={handleAddBlog} />
          </Togglable>

          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLikes={() => increaseLikes(blog.id)}
              deleteBlog={() => handleDeleteBlog(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
