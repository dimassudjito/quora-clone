const questionsResolvers = require('./questions')
const usersResolvers = require('./users')

module.exports = {
  Query: {
    ...questionsResolvers.Query
  },
  Mutation: {
    ...questionsResolvers.Mutation,
    ...usersResolvers.Mutation
  }
}
