const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverApi: {
        version: '1',
        strict: false,
        deprecationErrors: true,
      }
    });
    const { host, name } = mongoose.connection;
    // Redact potential credentials from URI in logs
    const safeUri = (process.env.MONGO_URI || '').replace(/:\\S+@/, ':***@');
    console.log("✅ MongoDB connected successfully!");
    console.log(`   ↳ Host: ${host}  DB: ${name}`);
    if (safeUri) console.log(`   ↳ URI: ${safeUri}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;


