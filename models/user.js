const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, required: true, minLength: 4 },
  password: { type: String, required: true, minLength: 6 },
  member: { type: Boolean },
  isAdmin: { type: Boolean },
});

/* UserSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/shoe/${this._id}`;
});
 */
// Export model
module.exports = mongoose.model('User', UserSchema);
