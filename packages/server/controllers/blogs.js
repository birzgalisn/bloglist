const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

function userExtractor(req, res, next) {
  let token = req.token
  let { id, username } = jwt.verify(token, process.env.SECRET)

  if (!token || !id) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  req.user = { id, username }
  next()
}

blogsRouter.get('/', async (req, res) => {
  let blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:blogId', async (req, res) => {
  let blog = await Blog.findOne({ _id: req.params.blogId })

  if (blog) {
    return res.json(blog)
  }

  res.status(404).end()
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  let body = req.body
  let user = req.user.id

  let newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user,
  })

  let savedBlog = await newBlog.save()
  res.json(savedBlog)
})

blogsRouter.post('/:blogId/like', userExtractor, async (req, res) => {
  let { _id, likes } = await Blog.findByIdAndUpdate(
    req.params.blogId,
    { $inc: { likes: 1 } },
    { timestamps: false, new: true }
  )
  res.json({ blog: _id, likes })
})

blogsRouter.post('/:blogId/comments', userExtractor, async (req, res) => {
  let body = req.body
  let user = req.user.id

  let newComment = new Comment({
    comment: body.comment,
    blog: req.params.blogId,
    user,
  })

  let savedComment = await newComment.save()
  res.json(savedComment)
})

blogsRouter.delete('/:blogId', userExtractor, async (req, res) => {
  let user = req.user.id
  let blog = await Blog.findById(req.params.blogId)

  if (!blog) {
    return res.status(404).end()
  } else if (blog.user?._id.toString() !== user.toString()) {
    return res
      .status(401)
      .json({ error: 'Only owner can request deletion of a blog' })
  }

  await blog.remove()
  res.status(200).json({ blog: blog._id })
})

module.exports = blogsRouter
