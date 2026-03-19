import mongoose from "mongoose";
import { env } from "../../config/env.js";

let isConnected = false;

export const databaseConnection = async () => {
  if (isConnected) return;

  if (!env.mongodbUri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000,
  });

  isConnected = true;
  console.log("database connected");
};

