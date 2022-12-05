const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 1, maxLength: 25 },
    message: { type: String, required: true, minLength: 1, maxLength: 150 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);
PostSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/home/posts/${this._id}`;
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
