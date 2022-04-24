import { Routes, Route } from 'react-router-dom'
import BlogList from './BlogList'
import Blog from './Blog'

const Blogs = () => {
  return (
    <Routes path="/">
      <Route index element={<BlogList />} />
      <Route path=":blogId" element={<Blog />} />
    </Routes>
  )
}

export default Blogs
