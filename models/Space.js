const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Space', SpaceSchema);
