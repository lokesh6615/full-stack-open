import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlicer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    editLike(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id != action.payload.id)
    },
  },
})

export const { setBlogs, appendBlog, editLike, removeBlog } = blogSlicer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.addBlog(newBlog)
    dispatch(appendBlog(savedBlog))
  }
}

export const addLike = (updatedBlog) => {
  return async (dispatch) => {
    const updated = await blogService.editBlog(updatedBlog.id, updatedBlog)
    dispatch(editLike(updated))
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogToDelete.id)
    dispatch(removeBlog(blogToDelete))
  }
}

export default blogSlicer.reducer
