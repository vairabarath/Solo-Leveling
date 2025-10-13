// config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Get the MongoDB URI from config
    const config = require("./env");
    const mongoURI = config.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
