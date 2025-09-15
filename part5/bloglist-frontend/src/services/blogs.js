import axios from 'axios'
const baseUrl = '/api/blogs'

let token
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addBlog = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const editBlog = async (id, updatedData) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedData, config)
  return response.data
}

export default { getAll, addBlog, setToken, editBlog }
