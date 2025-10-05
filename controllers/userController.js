const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  githubId: { type: String },
  displayName: { type: String }
});

module.exports = mongoose.model('User', userSchema);
