const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
    await mongoose.disconnect();
  }
}

module.exports = { connectDB, connection: mongoose.connection };
