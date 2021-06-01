const { model, Schema } = require('mongoose')

const questionSchema = new Schema({
  body: String,
  email: String,
  createdAt: String,
  answers: [
    {
      body: String,
      email: String,
      createdAt: String,
      comments: [
        {
          body: String,
          email: String,
          createdAt: String
        }
      ],
      upvotes: [
        {
          email: String,
          createdAt: String
        }
      ]
    }
  ],
  upvotes: [
    {
      email: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('Question', questionSchema)
