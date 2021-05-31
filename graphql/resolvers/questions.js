const Question = require('../../models/Question')

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
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createQuestion(_, { body }) {
      const newQuestion = new Question({
        body,
        username: 'dimas',
        createdAt: new Date().toISOString()
      })
      const question = await newQuestion.save()
      return question
    },
    async deleteQuestion(_, { questionId }) {
      try {
        const question = await Question.findById(questionId)
        await question.delete()
        return 'Question deleted successfully'
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
