const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const { MONGODB } = require('./config.js')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const PORT = process.env.port || 5555

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB: quora-clone database connected')
    return server.listen({ port: PORT })
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`)
  })
  .catch((err) => {
    console.error(err)
  })
