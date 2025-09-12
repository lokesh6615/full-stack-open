import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  return await axios.post(baseUrl, { username, password })
}

export default { login }
