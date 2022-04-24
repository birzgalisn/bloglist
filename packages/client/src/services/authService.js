import axios from 'axios'
const baseUrl = '/api'

const login = async userData => {
  let res = await axios.post(`${baseUrl}/login`, userData)
  return res.data
}

const register = async userData => {
  let res = await axios.post(`${baseUrl}/register`, userData)
  return res.data
}

const authService = { login, register }
export default authService
