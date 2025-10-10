import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlobForm from './components/BlobForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import {
  useNotificationValue,
  useNotificationDispatch,
} from './components/NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [notification, setNotification] = useState({})

  const blogFormRef = useRef()
  const notificationDispatch = useNotificationDispatch()
  const notification = useNotificationValue()
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userFromLocalStorage = JSON.parse(loggedInUser)
      setUser(userFromLocalStorage)
      blogService.setToken(userFromLocalStorage.token)
    }
  }, [])
  const newBlogMutation = useMutation({
    mutationFn: blogService.addBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (err) => {
      console.log(err)
      notificationDispatch(err.response.data.error || err.message)
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    },
  })

  const updateBlogLikes = useMutation({
    mutationFn: ({ id, updatedData }) => blogService.editBlog(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (err) => {
      console.log(err)
      notificationDispatch(err.response.data.error || err.message)
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (err) => {
      notificationDispatch(err.response?.data?.error || err.message)
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    },
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isPending) {
    return <span>Loading...</span>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }

  const blogs = result.data

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user.data))
      setUser(user.data)
      blogService.setToken(user.data.token)

      setUsername('')
      setPassword('')
      notificationDispatch('Login successfull')
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    } catch (error) {
      notificationDispatch('Invalid credentials')
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
      console.log('Error while logging in user', error)
    }
  }

  const handleAddBlog = async (formData, setFormData) => {
    try {
      blogFormRef.current.toggleVisibility()
      newBlogMutation.mutate(formData)
      notificationDispatch('Blob added successfull')
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
      setFormData({})
    } catch (error) {
      notificationDispatch('Failed to add blogs')
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    notificationDispatch('Logout successfully')
    setTimeout(() => {
      notificationDispatch('')
    }, 5000)
    setUser(null)
  }

  const increaseLikes = async (id) => {
    try {
      const blogToEdit = blogs.find((blog) => blog.id === id)
      const updatedData = { ...blogToEdit, likes: blogToEdit.likes + 1 }
      updateBlogLikes.mutate({ id: updatedData.id, updatedData })
      notificationDispatch('Likes updated successfully')
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    } catch (error) {
      notificationDispatch('Failed to update likes')
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)

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
        deleteBlogMutation.mutate(id)
        notificationDispatch('Blog deleted successfully')
        setTimeout(() => {
          notificationDispatch('')
        }, 5000)
      }
    } catch (error) {
      notificationDispatch('Failed to delete blog')
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)

      console.log('Error while deleting likes', error)
    }
  }

  return (
    <div>
      {!user && (
        <div>
          <Notification message={notification} />
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
          <Notification message={notification} />
          <h2>blogs</h2>
          <h3>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </h3>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlobForm createNew={handleAddBlog} />
          </Togglable>

          <br />
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
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
