const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 1, maxLength: 50 },
    message: { type: String, required: true, minLength: 1, maxLength: 200 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);
PostSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/home/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
