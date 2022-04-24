const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  let body = req.body
  let user = await User.findOne({ username: body.username })
  let passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  let userForToken = { username: user.username, id: user._id }
  let token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
