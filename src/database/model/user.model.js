import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    shareProfileName: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    otp: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("users", userSchema);
