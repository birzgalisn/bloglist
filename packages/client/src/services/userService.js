import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  let res = await axios.get(baseUrl)
  return res.data
}

const getOne = async userId => {
  let res = await axios.get(`${baseUrl}/${userId}`)
  return res.data
}

const userService = {
  getAll,
  getOne,
}
export default userService
