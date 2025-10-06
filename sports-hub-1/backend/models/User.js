const mongoose = require("mongoose");

// Define schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  // no two users can have same email
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  location: {
    state: { type: String },
    city: { type: String },
    country: { type: String },
  },
  position: { type: String }, // for players
  specialization: { type: String }, // for selectors/coaches
  role: {
    type: String,
    enum: ["player", "selector", "scout", "coach", "fan"], // allowed roles (expanded to match UI)
    default: "player"
  }
}, { timestamps: true }); // adds createdAt & updatedAt automatically

// Export model
module.exports = mongoose.model("User", UserSchema);


