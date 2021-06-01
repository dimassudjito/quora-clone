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
    }
  }
}
