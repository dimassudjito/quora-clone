const questionsResolvers = require('./questions')

module.exports = {
  Query: {
    ...questionsResolvers.Query
  },
  Mutation: {
    ...questionsResolvers.Mutation
  }
}
