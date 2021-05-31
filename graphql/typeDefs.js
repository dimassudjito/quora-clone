const gql = require('graphql-tag')

module.exports = gql`
  type Question {
    id: ID!
    question: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getQuestions: [Question]
    getQuestion(questionId: ID!): Question
  }
  type Mutation {
    createQuestion(question: String!): Question!
    deleteQuestion(questionId: ID!): String!
  }
`
