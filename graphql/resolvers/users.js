const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password } }) {
      // check username availability
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is taken')
      }

      // hash password and get auth token
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save()
      const token = generateToken(res)

      return { ...res._doc, id: res._id, token }
    }
  }
}
