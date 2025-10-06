const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    role: { type: String, enum: ['player', 'selector', 'scout', 'coach', 'fan'], required: true },
    fullName: { type: String, trim: true },
    age: { type: Number },
    sport: { type: String },
    position: { type: String },
    experience: { type: String },
    location: { type: String },
    bio: { type: String },
    achievements: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    avatarUrl: { type: String }, // Profile picture URL
    // Extendable bucket for role-specific fields
    extra: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);


