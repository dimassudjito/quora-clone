const usersResolvers = require('./users')
const questionsResolvers = require('./questions')
const answersResolvers = require('./answers')

module.exports = {
  Query: {
    ...questionsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...questionsResolvers.Mutation,
    ...answersResolvers.Mutation
  }
}
