const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError, addErrorLoggingToSchema } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      // check if user exists
      const user = await User.findOne({ email })
      if (!user) {
        throw new UserInputError('User not found')
      }

      // check if password is correct
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw new UserInputError('Wrong credentials')
      }

      // issue token
      const token = generateToken(user)

      return { ...user._doc, id: user._id, token }
    },
    async register(_, { registerInput: { name, email, password } }) {
      // check if email is already used
      const user = await User.findOne({ email })
      if (user) {
        throw new UserInputError('Email is already used')
      }

      // hash password and get auth token
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        name,
        password,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save()
      const token = generateToken(res)

      return { ...res._doc, id: res._id, token }
    }
  }
}
