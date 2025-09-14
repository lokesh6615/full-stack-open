import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formData, setFormData] = useState({})
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

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

  const handleAddBlog = async (e) => {
    e.preventDefault()
    try {
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

  return (
    <div>
      {!user && (
        <div>
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <form onSubmit={handleLogin}>
            <div>
              <label>
                User Name:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <br />
            <button type="submit">Login</button>
          </form>
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

          <button onClick={() => setVisible(!visible)} style={hideWhenVisible}>
            create new blog
          </button>
          <form onSubmit={handleAddBlog} style={showWhenVisible}>
            <div>
              <label>
                title:
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value })
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                author:
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, author: e.target.value })
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                url:
                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, url: e.target.value })
                  }}
                />
              </label>
            </div>
            <br />
            <button type="submit">create</button>
          </form>
          <button onClick={() => setVisible(!visible)} style={showWhenVisible}>
            cancel
          </button>

          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
