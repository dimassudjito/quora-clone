const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const gql = require('graphql-tag')

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`
const resolvers = {
  Query: {
    sayHi: () => 'Hello world'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({ port: 5555 }).then((res) => {
  console.log(`Server running at ${res.url}`)
})
