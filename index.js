const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const gql = require('graphql-tag')

const { MONGODB } = require('./config.js')
const Question = require('./models/Question')

const typeDefs = gql`
  type Query {
    getQuestions: [Question]
  }
  type Question {
    id: ID!
    question: String!
    createdAt: String!
    username: String!
  }
`
const resolvers = {
  Query: {
    async getQuestions() {
      try {
        const questions = await Question.find()
        return questions
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB: quora-clone database connected')
    return server.listen({ port: 5555 })
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`)
  })
