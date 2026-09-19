import mongoose from "mongoose";

const PASSWORD_PLACEHOLDERS = ["<db_password>", "YOUR_URL_ENCODED_PASSWORD"];

function getMongoUri() {
  const uri = process.env.DB_URL?.trim() || process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error("DB_URL or MONGODB_URI is missing. Add it to your .env file.");
  }

  if (PASSWORD_PLACEHOLDERS.some((placeholder) => uri.includes(placeholder))) {
    throw new Error(
      "Replace <db_password> in .env with the password for your MongoDB Atlas database user.",
    );
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error("MONGODB_URI must be a valid MongoDB connection string.");
  }

  return uri;
}

export async function connectToDatabase() {
  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  await mongoose.connect(getMongoUri(), {
    dbName: process.env.MONGODB_DB?.trim() || "capstonedemo",
    serverSelectionTimeoutMS: 10_000,
  });

  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

export async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
