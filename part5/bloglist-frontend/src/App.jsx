import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formData, setFormData] = useState({})
  const [user, setUser] = useState(null)

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
    } catch (error) {
      console.log('Error while logging in user', error)
    }
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()
    try {
      const newBlob = await blogService.addBlog(formData)
      setBlogs(blogs.concat(newBlob))
      setFormData({})
    } catch (error) {
      console.log('Error adding new blog', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <div>
      {!user && (
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
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <h3>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </h3>

          <h2>Create new</h2>
          <form onSubmit={handleAddBlog}>
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
