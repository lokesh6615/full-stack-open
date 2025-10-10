import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import BlobForm from './components/BlobForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { handleNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/loginReducer'
import { initializeUserDetails } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
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

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(handleNotification('Logout successfully', 5))
  }

  return (
    <div>
      <Notification />
      {user ? (
        <div>
          <h2>blogs</h2>
          <h3>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </h3>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users users={userDetails} />} />
            <Route path="/users/:id" element={<UserBlogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
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
      )}
    </div>
  )
}

export default App
