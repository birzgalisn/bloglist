const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  let users = await User.find({}).populate('blogs').populate('comments')
  res.json(users)
})

usersRouter.get('/:userId', async (req, res) => {
  let user = await User.findById({ _id: req.params.userId })
    .populate('blogs')
    .populate('comments')

  if (user) {
    return res.json(user)
  }

  res.status(404).end()
})

module.exports = usersRouter
