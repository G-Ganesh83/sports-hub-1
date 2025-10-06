const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  selector: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  location: { type: String, required: true },
  contactInfo: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);


