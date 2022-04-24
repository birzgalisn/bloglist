const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

commentSchema.post('save', function (comment) {
  Promise.all([
    this.model('User').findOneAndUpdate(
      { _id: comment.user },
      { $push: { comments: comment._id } },
      { timestamps: false }
    ),
    this.model('Blog').findOneAndUpdate(
      { _id: comment.blog },
      { $push: { comments: comment._id } },
      { timestamps: false }
    ),
  ])
})

commentSchema.pre(['find', 'findOne'], function (next) {
  this.populate('user', 'username name')
  next()
})

commentSchema.post('remove', function (comment) {
  Promise.all([
    this.model('User').findOneAndUpdate(
      { _id: comment.user },
      { $pull: { comments: comment._id } },
      { timestamps: false }
    ),
  ])
})

commentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
