const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
)

blogSchema.post('save', function (blog) {
  Promise.all([
    this.model('User').findOneAndUpdate(
      { _id: blog.user },
      { $push: { blogs: blog._id } },
      { timestamps: false }
    ),
  ])
})

blogSchema.post('remove', function (blog) {
  Promise.all([
    this.model('User').findOneAndUpdate(
      { _id: blog.user },
      { $pull: { blogs: blog._id } },
      { timestamps: false }
    ),
    this.model('Comment').deleteMany({ blog: blog._id }),
  ])
})

blogSchema.pre(['find', 'findOne'], function (next) {
  this.populate('user', 'name username')
  this.populate('comments')
  next()
})

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
