const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user.model')
const { JWT_SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  if (!user) {
    return response.status(400).json({ error: 'Invalid username' })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    return response.status(400).json({ error: 'Invalid password' })
  }

  const payload = {
    username,
    id: user._id,
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 })

  response.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
