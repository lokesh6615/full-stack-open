import axios from 'axios'
const baseUrl = '/api/users'

const getUsersDetails = async () => {
  const userDetails = await axios.get(baseUrl)
  return userDetails.data
}

export default { getUsersDetails }
