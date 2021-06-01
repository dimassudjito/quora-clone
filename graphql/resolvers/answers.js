const { AuthenticationError, UserInputError } = require('apollo-server')

const Question = require('../../models/Question')
const auth = require('../../util/auth')

module.exports = {
  Mutation: {
    createAnswer: async (_, { questionId, body }, context) => {
      const user = auth(context)

      if (body.trim() === '') {
        throw new UserInputError('Empty answer', {
          errors: {
            body: 'Answers body must not be empty'
          }
        })
      }

      const question = await Question.findById(questionId)
      if (question) {
        question.answers.unshift({
          body,
          email: user.email,
          createdAt: new Date().toISOString()
        })
        await question.save()
        return question
      } else {
        throw new UserInputError('Question not found')
      }
    },
    deleteAnswer: async (_, { questionId, answerId }, context) => {
      const user = auth(context)

      const question = await Question.findById(questionId)
      if (question) {
        const answerIndex = question.answers.findIndex((a) => a.id === answerId)
        if (question.answers[answerIndex].email === user.email) {
          question.answers.splice(answerIndex, 1)
          await question.save()
          return question
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Answer not found')
      }
    }
  }
}
