import axios from 'axios'
const baseUrl = '/api/blogs'
let user = null

const setUser = newUser => {
  user = { ...newUser, token: `Bearer ${newUser?.token}` }
}

const config = () => {
  return { headers: { Authorization: user.token } }
}

const getAll = async () => {
  let res = await axios.get(baseUrl)
  return res.data
}

const getOne = async blogId => {
  let res = await axios.get(`${baseUrl}/${blogId}`)
  return res.data
}

const create = async blogData => {
  const res = await axios.post(baseUrl, blogData, config())
  return { ...res.data, user: { ...res.data?.user, username: user.username } }
}

const comment = async commentData => {
  let { blogId, comment } = commentData
  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comment },
    config()
  )
  return res.data
}

const remove = async blogId => {
  let res = await axios.delete(`${baseUrl}/${blogId}`, config())
  return res.data
}

const like = async blogId => {
  let res = await axios.post(`${baseUrl}/${blogId}/like`, {}, config())
  return res.data
}

const blogService = {
  setUser,
  getAll,
  getOne,
  create,
  comment,
  remove,
  like,
}
export default blogService
