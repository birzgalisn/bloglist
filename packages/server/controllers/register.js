const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerRouter = require('express').Router()
const User = require('../models/user')

registerRouter.post('/', async (req, res) => {
  let body = req.body
  if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: 'Password must be atleast 3 characters long' })
  }

  let saltRounds = 10
  let passwordHash = await bcrypt.hash(body.password, saltRounds)
  let user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  let savedUser = await user.save()

  let userForToken = { username: savedUser.username, id: savedUser._id }
  let token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

  res
    .status(200)
    .send({ token, username: savedUser.username, name: savedUser.name })
})

module.exports = registerRouter
