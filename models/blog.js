const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {},
    message: { type: String, required: true, minLength: 1, maxLength: 150 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
