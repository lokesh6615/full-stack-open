import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (payload) => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default { getAll, createNew }
