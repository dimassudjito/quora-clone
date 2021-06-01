const gql = require('graphql-tag')

module.exports = gql`
  type Question {
    id: ID!
    body: String!
    createdAt: String!
    email: String!
    answers: [Answer]!
    answerCount: Int!
    upvotes: [Upvote]!
    upvoteCount: Int!
  }
  type Answer {
    id: ID!
    createdAt: String!
    email: String!
    body: String!
    comments: [Comment]!
    commentCount: Int!
    upvotes: [Upvote]!
    upvoteCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    email: String!
    body: String!
  }
  type Upvote {
    id: ID!
    createdAt: String!
    email: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    name: String!
    createdAt: String!
  }
  input RegisterInput {
    name: String!
    password: String!
    email: String!
  }
  type Query {
    getQuestions: [Question]
    getQuestion(questionId: ID!): Question
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createQuestion(body: String!): Question!
    deleteQuestion(questionId: ID!): String!
    createAnswer(questionId: ID!, body: String!): Question!
    deleteAnswer(questionId: ID!, answerId: ID!): Question!
    upvoteQuestion(questionId: ID!): Question!
    downvoteQuestion(questionId: ID!): Question!
    upvoteAnswer(questionId: ID!, answerId: ID!): Question!
    downvoteAnswer(questionId: ID!, answerId: ID!): Question!
  }
`
