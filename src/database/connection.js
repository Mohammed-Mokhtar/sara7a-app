import mongoose from "mongoose";

let isConnected = false;

export const databaseConnection = async () => {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  isConnected = true;
  console.log("database connected");
};
