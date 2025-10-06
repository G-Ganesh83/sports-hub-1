const mongoose = require('mongoose');

const SelectorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  organization: { type: String },
  expertise: { type: String },
  regions: { type: String },
  bio: { type: String },
  links: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Selector', SelectorSchema);


