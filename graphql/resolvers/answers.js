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
        if (answerIndex === -1) {
          throw new UserInputError('Answer not found')
        }
        if (question.answers[answerIndex].email === user.email) {
          question.answers.splice(answerIndex, 1)
          await question.save()
          return question
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Question not found')
      }
    },
    upvoteAnswer: async (_, { questionId, answerId }, context) => {
      const user = auth(context)

      const question = await Question.findById(questionId)
      if (question) {
        const answerIndex = question.answers.findIndex((a) => a.id === answerId)
        if (answerIndex === -1) {
          throw new UserInputError('Answer not found')
        }
        const answer = question.answers[answerIndex]
        if (answer.upvotes.find((upvote) => upvote.email === user.email)) {
          // already upvoted, hence un-upvote
          answer.upvotes = question.answers[answerIndex].upvotes.filter(
            (upvote) => upvote.email !== user.email
          )
        } else {
          // not yet upvoted, hence upvote
          answer.upvotes.push({
            email: user.email,
            createdAt: new Date().toISOString()
          })
          // also un-downvote if downvoted
          if (
            answer.downvotes.find((downvote) => downvote.email === user.email)
          ) {
            answer.downvotes = answer.downvotes.filter(
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
    downvoteAnswer: async (_, { questionId, answerId }, context) => {
      const user = auth(context)

      const question = await Question.findById(questionId)
      if (question) {
        const answerIndex = question.answers.findIndex((a) => a.id === answerId)
        if (answerIndex === -1) {
          throw new UserInputError('Answer not found')
        }
        const answer = question.answers[answerIndex]
        if (
          answer.downvotes.find((downvote) => downvote.email === user.email)
        ) {
          // already downvoted, hence un-downvote
          answer.downvotes = question.answers[answerIndex].downvotes.filter(
            (downvote) => downvote.email !== user.email
          )
        } else {
          // not yet downvoted, hence downvote
          answer.downvotes.push({
            email: user.email,
            createdAt: new Date().toISOString()
          })
          // also un-upvote if upvoted
          if (answer.upvotes.find((upvote) => upvote.email === user.email)) {
            answer.upvotes = answer.upvotes.filter(
              (upvote) => upvote.email !== user.email
            )
          }
        }
        await question.save()
        return question
      } else {
        throw new UserInputError('Question not found')
      }
    },
    createComment: async (_, { questionId, answerId, body }, context) => {
      const user = auth(context)

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comments body must not be empty'
          }
        })
      }

      const question = await Question.findById(questionId)
      if (question) {
        const answerIndex = question.answers.findIndex((a) => a.id === answerId)
        if (answerIndex === -1) {
          throw new UserInputError('Answer not found')
        }
        const answer = question.answers[answerIndex]
        answer.comments.unshift({
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
    deleteComment: async (_, { questionId, answerId, commentId }, context) => {
      const user = auth(context)

      const question = await Question.findById(questionId)
      if (question) {
        // find the answer
        const answerIndex = question.answers.findIndex((a) => a.id === answerId)
        if (answerIndex === -1) {
          throw new UserInputError('Answer not found')
        }
        const answer = question.answers[answerIndex]
        // find the comment
        const commentIndex = answer.comments.findIndex(
          (c) => c.id === commentId
        )
        if (answer.comments[commentIndex].email === user.email) {
          answer.comments.splice(commentIndex, 1)
          await question.save()
          return question
        } else {
          throw new AuthenticationError('Action not allowed')
        }
        await question.save()
        return question
      } else {
        throw new UserInputError('Question not found')
      }
    }
  }
}
