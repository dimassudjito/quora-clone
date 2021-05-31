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
  }
}
