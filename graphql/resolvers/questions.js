const { AuthenticationError, UserInputError } = require('apollo-server')

const Question = require('../../models/Question')
const auth = require('../../util/auth')

module.exports = {
  Query: {
    async getQuestions() {
      try {
        const questions = await Question.find()
        return questions
      } catch (err) {
        throw new Error(err)
      }
    },
    async getQuestion(_, { questionId }) {
      try {
        const question = await Question.findById(questionId)
        if (question) {
          return question
        } else {
          throw new Error('Question not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createQuestion(_, { body }, context) {
      const user = auth(context)

      if (body.trim() === '') {
        throw new Error('Question body must not be empty')
      }

      const newQuestion = new Question({
        body,
        email: user.email,
        user: user.id,
        createdAt: new Date().toISOString()
      })
      const question = await newQuestion.save()
      return question
    },
    async deleteQuestion(_, { questionId }, context) {
      const user = auth(context)

      try {
        const question = await Question.findById(questionId)
        if (user.email === question.email) {
          await question.delete()
          return 'Question deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async upvoteQuestion(_, { questionId }, context) {
      const user = auth(context)

      const question = await Question.findById(questionId)
      if (question) {
        if (question.upvotes.find((upvote) => upvote.email === user.email)) {
          // already upvoted, hence un-upvote
          question.upvotes = question.upvotes.filter(
            (upvote) => upvote.email !== user.email
          )
        } else {
          // not yet upvoted, hence upvote
          question.upvotes.push({
            email: user.email,
            createdAt: new Date().toISOString()
          })
          // also un-downvote if downvoted
          if (
            question.downvotes.find((downvote) => downvote.email === user.email)
          ) {
            question.downvotes = question.downvotes.filter(
              (downvote) => downvote.email !== user.email
            )
          }
        }
        await question.save()
        return question
      } else {
        throw new UserInputError('Question not found')
      }
    },
    async downvoteQuestion(_, { questionId }, context) {
      const user = auth(context)

      const question = await Question.findById(questionId)
      if (question) {
        if (
          question.downvotes.find((downvote) => downvote.email === user.email)
        ) {
          // already downvoted, hence un-downvote
          question.downvotes = question.downvotes.filter(
            (downvote) => downvote.email !== user.email
          )
        } else {
          // not yet downvoted, hence downvote
          question.downvotes.push({
            email: user.email,
            createdAt: new Date().toISOString()
          })
          // also un-upvote if upvoted
          if (question.upvotes.find((upvote) => upvote.email === user.email)) {
            question.upvotes = question.upvotes.filter(
              (upvote) => upvote.email !== user.email
            )
          }
        }
        await question.save()
        return question
      } else {
        throw new UserInputError('Question not found')
      }
    }
  }
}
