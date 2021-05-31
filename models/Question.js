const { model, Schema } = require('mongoose')

const questionSchema = new Schema({
  question: String,
  username: String,
  createdAt: String
  //   comments: [
  //     {
  //       body: String,
  //       username: String,
  //       createdAt: String
  //     }
  //   ],
  //   likes: [
  //     {
  //       username: String,
  //       createdAt: String
  //     }
  //   ],
  //   user: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'users'
  //   }
})

module.exports = model('Question', questionSchema)
