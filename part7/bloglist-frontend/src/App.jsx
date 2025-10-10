import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { handleNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/loginReducer'
import { initializeUserDetails } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import BlogDetails from './components/BlogDetails'
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

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
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f6fa',
        py: 4,
      }}
    >
      <Notification />
      {user ? (
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            background: 'white',
            borderRadius: 2,
            boxShadow: 2,
            p: 3,
          }}
        >
          <Box
            component="nav"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
              borderBottom: '1px solid #e0e0e0',
              pb: 1,
            }}
          >
            <Box>
              <a
                href="/"
                style={{
                  marginRight: 16,
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 500,
                }}
              >
                Blogs
              </a>
              <a
                href="/users"
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 500,
                }}
              >
                Users
              </a>
            </Box>
            <Box>
              <span style={{ marginRight: 12, color: '#333' }}>
                {user.username} logged in
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '6px 16px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Logout
              </button>
            </Box>
          </Box>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users users={userDetails} />} />
            <Route path="/users/:id" element={<UserBlogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Togglable buttonLabel="Login">
            <LoginForm
              username={username}
              password={password}
              handleUserNameChange={(e) => setUsername(e.target.value)}
              handlePasswordChange={(e) => setPassword(e.target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </Box>
      )}
    </Box>
  )
}

export default App
