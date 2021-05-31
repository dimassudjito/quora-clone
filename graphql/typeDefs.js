const gql = require('graphql-tag')

module.exports = gql`
  type Question {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    answers: [Answer]!
    answerCount: Int!
    likes: [Like]!
    likeCount: Int!
  }
  type Answer {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    comments: [Comment]!
    commentCount: Int!
    likes: [Like]!
    likeCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }
  type Query {
    getQuestions: [Question]
    getQuestion(questionId: ID!): Question
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createQuestion(body: String!): Question!
    deleteQuestion(questionId: ID!): String!
  }
`
