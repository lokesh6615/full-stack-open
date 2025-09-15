import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlobForm from './components/BlobForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
      setNotification({ message: 'Login successfull', type: 'success' })
      setTimeout(() => {
        setNotification({})
      }, 3000)
    } catch (error) {
      setNotification({ message: 'Invalid credentials', type: 'error' })
      setTimeout(() => {
        setNotification({})
      }, 3000)
      console.log('Error while logging in user', error)
    }
  }

  const handleAddBlog = async (formData, setFormData) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlob = await blogService.addBlog(formData)
      setBlogs(blogs.concat(newBlob))
      setNotification({ message: 'Blob added successfull', type: 'success' })
      setTimeout(() => {
        setNotification({})
      }, 3000)
      setFormData({})
    } catch (error) {
      setNotification({ message: 'Failed to add blogs', type: 'error' })
      setTimeout(() => {
        setNotification({})
      }, 3000)
      console.log('Error adding new blog', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setNotification({ message: 'Logout successfully', type: 'success' })
    setTimeout(() => {
      setNotification({})
    }, 3000)
    setUser(null)
  }

  const increaseLikes = async (id) => {
    try {
      const blogToEdit = blogs.find((blog) => blog.id === id)
      const updatedData = { ...blogToEdit, likes: blogToEdit.likes + 1 }
      const response = await blogService.editBlog(id, updatedData)
      setBlogs(blogs.map((blog) => (blog.id != id ? blog : response)))
    } catch (error) {
      setNotification({ message: 'Failed to update likes', type: 'error' })
      setTimeout(() => {
        setNotification({})
      }, 3000)
      console.log('Error while updating likes', error)
    }
  }

  return (
    <div>
      {!user && (
        <div>
          <Notification
            message={notification.message}
            type={notification.type}
          />
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
          <Notification
            message={notification.message}
            type={notification.type}
          />
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
              updateLikes={() => increaseLikes(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
